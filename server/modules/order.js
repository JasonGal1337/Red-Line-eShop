const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: {
        type: [String],
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;