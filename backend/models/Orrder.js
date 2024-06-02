const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    orders: [
      {
        fname: String,
        lname: String,
        username: String,
        street: String,
        city: String,
        phone: Number,
        paymentId: {
          type: String,
          default: " ",
        },
        sta: String,
        pin: Number,
        payment_mode: String,
        createdAt: String,
        delivarDate: String,
        productPrice: Number,
        shippingDoneDate: String,
        packageArrivedDate: String,
        orderDone: { type: Boolean, default: true },
        shippingDone: { type: Boolean, default: false },
        packageArrived: { type: Boolean, default: false },
        delivered: { type: Boolean, default: false },

        cart: [
          {
            profileImage: {
              type: String,
              default: "ri",
            },
            id: String,
            name: String,
            color: String,
            amount: Number,
            image: String,
            price: Number,
            cart_status: { type: Boolean, default: true },
          },
        ],
        cart_history: [
          {
            profileImage: {
              type: String,
              default: "ri",
            },
            id: String,
            name: String,
            color: String,
            amount: Number,
            image: String,
            price: Number,
            cart_status: { type: Boolean, default: true },
            createdAt: {
              type: Date,
              default: Date.now, // You can set a default value if needed
            },
          },
        ],
        cancel_order: [
          {
            id: String,
            name: String,
            color: String,
            amount: Number,
            image: String,
            price: Number,
            cancel_status: { type: Boolean, default: true },
            cancel_payement: { type: Boolean, default: false },
          },
        ],
        return_order: [
          {
            id: String,
            name: String,
            color: String,
            amount: Number,
            image: String,
            price: Number,
            return_status: { type: Boolean, default: true },
            PickedDone: { type: Boolean, default: false },
            paymentBack: { type: Boolean, default: false },
            DelivaryDone: { type: Boolean, default: false },
            return_statusDate: { type: Date, default: Date.now },
            PickedDoneDate: String,
            paymentBackDate: String,
            DelivaryDoneDate: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orrder", orderSchema);
