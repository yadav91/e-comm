// Mongoose ko import kar rahe hain
const mongoose = require('mongoose');

// MongoDB se connection establish kar rahe hain
mongoose.connect('mongodb://localhost:27017/ecomm', {
  useNewUrlParser: true, // URL parser ko naya version use karne ke liye
  useUnifiedTopology: true, // Unified topology ka use kar rahe hain jisse connection management better ho
});

// Optional: Jab connection successful ho jata hai tab log karne ke liye
mongoose.connection.once('open', () => {
  
// MongoDB ke successful connection ka message log kar rahe hain
  console.log("MongoDB connected successfully!"); 
});
