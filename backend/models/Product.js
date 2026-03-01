const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    variants: [{
        weight: String,
        price: Number,
        sku: String,
        stock: { type: Number, default: 0 }
    }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
