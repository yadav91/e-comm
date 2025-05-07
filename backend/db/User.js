// Import mongoose
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Export the User model
module.exports = mongoose.model("users", userSchema);
