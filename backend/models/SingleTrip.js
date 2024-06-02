// // const mongoose = require("mongoose");

// // const TestimonialSchema = new mongoose.Schema({
// //   username: String,
// //   content: String,
// // });

// // const TripSchema = new mongoose.Schema({
// //   id: String,
// //   name: String,
// //   price: Number,
// //   duration: Number,
// //   rating: Number,
// //   images: [String],
// //   details: String,
// //   numberOfDays: Number,
// //   highlights: String,
// //   accommodation: String,
// //   transportation: String,
// //   meals: String,
// //   guides: String,
// //   testimonials: [TestimonialSchema],
// // });

// // const SingleTrip = mongoose.model("SingleTrip", TripSchema);

// // module.exports = SingleTrip;
// const mongoose = require("mongoose");

// const TestimonialSchema = new mongoose.Schema({
//   username: String,
//   content: String,
// });

// const TripSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   price: Number,
//   duration: Number,
//   rating: Number,
//   images: [String],
//   details: String,
//   numberOfDays: Number,
//   highlights: [String], // Updated to array of strings
//   accommodation: [String], // Updated to array of strings
//   transportation: [String], // Updated to array of strings
//   meals: String,
//   guides: String,
//   testimonials: [TestimonialSchema],
// });

// const SingleTrip = mongoose.model("SingleTrip", TripSchema);

// module.exports = SingleTrip;
const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  username: String,
  content: String,
});

const GuideSchema = new mongoose.Schema({
  name: String,
  image: String,
  phone: String,
  email: String,
});

const TransportSchema = new mongoose.Schema({
  type: String,
  details: String,
});

const HotelSchema = new mongoose.Schema({
  name: String,
  image: String,
  address: String,
});

const TripSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  duration: Number,
  rating: Number,
  images: [String],
  details: String,
  numberOfDays: Number,
  highlights: [String],
  accommodation: [String],
  transportation: [TransportSchema],
  meals: String,
  guides: [GuideSchema],
  testimonials: [TestimonialSchema],
  hotels: [HotelSchema],
});

const SingleTrip = mongoose.model("SingleTrip", TripSchema);

module.exports = SingleTrip;
