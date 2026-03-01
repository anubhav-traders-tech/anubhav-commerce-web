const mongoose = require('mongoose');

const importSessionSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    products: { type: Array, default: [] },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'failed'], default: 'pending' },
    error: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ImportSession', importSessionSchema);
