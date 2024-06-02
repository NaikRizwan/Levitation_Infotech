// const mongoose = require("mongoose");

// const invoiceSchema = new mongoose.Schema({
//   user: Object,
//   products: Array,
//   date: Date,
//   pdfData: Buffer,
// });

// module.exports = mongoose.model("Invoice", invoiceSchema);
const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  email: String,
  products: Array,
  date: Date,
  pdfData: Buffer,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
