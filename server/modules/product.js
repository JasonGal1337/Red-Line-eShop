const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technicalInformation: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    categories: {
      type: [String],
      default: [],
    },
  });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;