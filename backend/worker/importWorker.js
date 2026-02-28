const { Worker } = require('bullmq');
const Redis = require('ioredis');
const { exec } = require('child_process');
const ImportSession = require('../models/ImportSession');
const mongoose = require('mongoose');
require('dotenv').config();

// Direct connect to DB for the worker process
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/anubhav-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

function runPythonExtractor(filePath, brand) {
    return new Promise((resolve, reject) => {
        // Calling the Python script
        console.log(`Executing python extractor for ${filePath}`);
        const processCmd = `python python/extractor.py "${filePath}" "${brand}"`;

        exec(processCmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
            if (err) {
                console.error('Python Extractor failed:', stderr);
                return reject(err);
            }
            resolve(stdout);
        });
    });
}

const worker = new Worker(
    'product-import',
    async (job) => {
        const { filePath, brand } = job.data;

        console.log(`Processing job ${job.id} - ${brand} - ${filePath}`);

        // Update progress
        await job.updateProgress(10);

        try {
            // 1. Run Python Script (OCR + AI + Normalize)
            const output = await runPythonExtractor(filePath, brand);
            await job.updateProgress(70);

            // Parse JSON
            let products;
            try {
                products = JSON.parse(output);
            } catch (e) {
                throw new Error("Failed to parse Python JSON output: " + output.slice(0, 100));
            }

            // 2. Create Import Session for manual review
            const session = await ImportSession.create({
                brand: brand,
                products: products,
                status: 'pending'
            });
            await job.updateProgress(100);

            return { sessionId: session._id, message: "Extraction complete, waiting for review." };

        } catch (error) {
            console.error(`Job ${job.id} failed:`, error.message);
            // We can record a failed session too for debugging
            await ImportSession.create({
                brand: brand,
                status: 'failed',
                error: error.message
            });
            throw error; // Let BullMQ handle failure/retries
        }
    },
    { connection }
);

worker.on('failed', (job, err) => {
    console.error(`Worker failed on job ${job ? job.id : 'unknown'}:`, err.message);
});

console.log('Worker is processing "product-import" queue...');
