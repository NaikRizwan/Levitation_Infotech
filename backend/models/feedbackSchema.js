const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  // You can add more fields if needed, e.g., timestamp, etc.
});

module.exports = mongoose.model("Feedback", feedbackSchema);
