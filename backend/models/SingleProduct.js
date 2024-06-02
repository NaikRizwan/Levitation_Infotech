// const mongoose = require("mongoose");

// const imageSchema = new mongoose.Schema({
//   id: String,
//   width: Number,
//   height: Number,
//   url: String,
//   filename: String,
//   size: Number,
//   type: String,
// });

// const productDetailSchema = new mongoose.Schema({
//   stock: Number,
//   reviews: Number,
//   stars: Number,
//   image: [imageSchema],
// });

// const productSchema = new mongoose.Schema({
//   _id: String,
//   details: productDetailSchema,
// });

// const SingleProduct = mongoose.model("SingleProduct", productSchema);

// module.exports = SingleProduct;

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  id: String,
  width: Number,
  height: Number,
  url: String,
  filename: String,
  size: Number,
  type: String,
});

const productSchema = new mongoose.Schema({
  id: String,
  stock: Number,
  reviews: Number,
  stars: Number,
  image: [imageSchema],
});

const SingleProduct = mongoose.model("SingleProduct", productSchema);

module.exports = SingleProduct;
