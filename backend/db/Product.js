// Import mongoose
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Just the filename, not full URL
});

module.exports = mongoose.model("Product", productSchema);
