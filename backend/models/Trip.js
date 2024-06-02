// // models/Trip.js
// const mongoose = require("mongoose");

// const tripSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   rate: { type: Number, required: true },
//   details: { type: String, required: true },
// });

// const Trip = mongoose.model("Trip", tripSchema);

// module.exports = Trip;

const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  images: [{ type: String, required: true }], // Assuming 'images' is an array of strings
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  totalViews: { type: Number, required: true },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
