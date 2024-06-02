const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  createdAt: {
    type: Date,
    default: Date.now, // You can set a default value if needed
  },
});
module.exports = mongoose.model("alert", userSchema);
