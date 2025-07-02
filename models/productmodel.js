

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String, // 👈 String, not Array
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  offerPrice: {
    type: String,
    required: true
  },
  image: {
    type: [String], // 👈 Array of image filenames
    required: true
  },
  category: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
