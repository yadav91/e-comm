// Import mongoose
const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Path to the image
});

module.exports = mongoose.model("Product", productSchema);
