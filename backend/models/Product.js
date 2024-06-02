const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  company: String,
  price: Number,
  colors: [String],
  image: String,
  description: String,
  category: String,
  shipping: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  // Add more fields as needed
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
