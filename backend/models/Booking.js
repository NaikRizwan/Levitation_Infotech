// // // // models/Booking.js
// // // const mongoose = require("mongoose");

// // // const bookingSchema = new mongoose.Schema({
// // //   email: { type: String, required: true, unique: true },
// // //   bookings: [
// // //     {
// // //       fullName: { type: String, required: true },
// // //       contactNumber: { type: String, required: true },
// // //       destination: { type: String, required: true },
// // //       journeyDate: { type: Date, required: true },
// // //       numberOfDays: { type: Number, required: true },
// // //       aadharNumber: { type: String },
// // //       tripId: { type: Number, required: true },
// // //       rate: { type: Number, required: true },
// // //     },
// // //   ],
// // // });

// // // const Booking = mongoose.model("Booking", bookingSchema);

// // // module.exports = Booking;
// // const mongoose = require("mongoose");

// // const bookingSchema = new mongoose.Schema({
// //   tripId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Trip",
// //     required: true,
// //   },
// //   totalPrice: {
// //     type: Number,
// //     required: true,
// //   },
// //   paymentStatus: {
// //     type: String,
// //     enum: ["pending", "paid"],
// //     default: "pending",
// //   },
// //   // other booking details...
// //   mobile: String,
// //   location: String,
// //   members: Number,
// //   checkinDate: Date,
// //   checkoutDate: Date,
// //   pickupDestination: String,
// //   gender: String,
// //   age: Number,
// // });

// // const userSchema = new mongoose.Schema({
// //   fullname: {
// //     type: String,
// //     required: true,
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   bookings: [bookingSchema],
// // });

// // module.exports = mongoose.model("Booking", userSchema);
// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema({
//   fullname: String,
//   email: String,
//   mobile: String,
//   location: String,
//   members: Number,
//   checkinDate: String,
//   checkoutDate: String,
//   pickupDestination: String,
//   gender: String,
//   age: Number,
//   paymentOption: String,
//   paymentId: String,
//   totalPrice: Number,
// });

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   name: String,
//   bookings: [BookingSchema],
// });

// const Booking = mongoose.model("Booking", UserSchema);
// module.exports = Booking;
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  mobile: String,
  location: String,
  members: Number,
  checkinDate: String,
  checkoutDate: String,
  pickupDestination: String,
  gender: String,
  age: Number,
  paymentOption: String,
  paymentId: String,
  totalPrice: Number,
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  bookings: [BookingSchema],
});

const Booking = mongoose.model("Booking", UserSchema);
module.exports = Booking;
