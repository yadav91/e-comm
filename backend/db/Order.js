const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
  },
  address: {
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  products: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: String,  // Removed default: "pending"
  razorpayPaymentId: String,
  razorpayOrderId: String,
  createdAt: Date          // Removed default: Date.now
});

module.exports = mongoose.model("Order", orderSchema);
