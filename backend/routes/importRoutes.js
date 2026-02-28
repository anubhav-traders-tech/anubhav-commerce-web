const express = require('express');
const router = express.Router();
const multer = require('multer');
const importQueue = require('../queue/importQueue');
const ImportSession = require('../models/ImportSession');
const Product = require('../models/Product');

// Configure multer for PDF uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

// POST endpoint to upload PDF and queue job
router.post('/import-products', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const brand = req.body.brand || 'Unknown';

        const job = await importQueue.add('process-pdf', {
            filePath: req.file.path,
            brand: brand
        }, { attempts: 3 });

        res.json({ jobId: job.id, message: 'Job queued successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET status of a specific job
router.get('/import-status/:jobId', async (req, res) => {
    try {
        const job = await importQueue.getJob(req.params.jobId);
        if (!job) return res.status(404).json({ error: 'Job not found' });

        const state = await job.getState();
        const progress = job.progress;
        const result = job.returnvalue;
        const failedReason = job.failedReason;

        res.json({ state, progress, result, failedReason });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all import sessions for the manual review dashboard
router.get('/import-sessions', async (req, res) => {
    const sessions = await ImportSession.find().sort({ createdAt: -1 });
    res.json(sessions);
});

// POST endpoint to approve a session and insert products into DB
router.post('/approve-import/:sessionId', async (req, res) => {
    try {
        const session = await ImportSession.findById(req.params.sessionId);
        if (!session) return res.status(404).json({ error: 'Session not found' });
        if (session.status !== 'pending') return res.status(400).json({ error: 'Session is not pending' });

        // Deduplication logic
        for (const product of session.products) {
            // Find matching products by name and brand
            const existingProduct = await Product.findOne({ name: product.name, brand: session.brand });

            if (existingProduct) {
                // Merge variants
                for (const variant of product.variants) {
                    const existingVariant = existingProduct.variants.find(v => v.sku === variant.sku);
                    if (existingVariant) {
                        existingVariant.price = variant.price; // Update price
                    } else {
                        existingProduct.variants.push(variant); // Add new variant
                    }
                }
                await existingProduct.save();
            } else {
                product.brand = session.brand;
                await Product.create(product);
            }
        }

        session.status = 'approved';
        await session.save();

        res.json({ message: 'Products Imported successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
