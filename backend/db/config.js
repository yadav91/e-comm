require('dotenv').config(); // Loads environment variables from .env

console.log("Mongo URI:", process.env.MONGODB_URI); // Debugging check for the Mongo URI

const mongoose = require('mongoose');

// Use the correct environment variable name here
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI is not defined in the .env file!');
  process.exit(1); // Exit the app if MONGODB_URI is not available
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas connected successfully!"))
.catch(err => console.error("❌ MongoDB connection error:", err));
