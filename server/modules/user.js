const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true, 
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
    addedToCart: {
        type: [String],
        default: [],
    },
    boughtBefore: {
        type: [String],
        default: [],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;