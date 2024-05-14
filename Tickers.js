const mongoose = require('mongoose');

const WazirxTickerSchema = new mongoose.Schema({
    base_unit: { type: String, required: true },
    quote_unit: { type: String, required: true },
    low: { type: Number, required: true },
    high: { type: Number, required: true },
    last: { type: Number, required: true },
    open: { type: Number, required: true },
    volume: { type: Number, required: true },
    sell: { type: Number, required: true },
    buy: { type: Number, required: true },
    name: { type: String, required: true },
    at: { type: Date, required: true, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('crypto', WazirxTickerSchema);
