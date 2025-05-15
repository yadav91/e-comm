// Express aur other necessary modules ko import kar rahe hain
const express = require('express');
const path = require('path');
const cors = require("cors");
const Razorpay = require('razorpay');

// Database Connection aur Models ko import kar rahe hain
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const Order = require('./db/Order');
const sendOrderConfirmationEmail = require('./db/emailService');

// Express application ko initialize kar rahe hain
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: "https://e-comm-rho-sepia.vercel.app", // ✅ Updated to new Vercel frontend domain
  credentials: true
}));


app.use('/images', express.static(path.join(__dirname, 'images'))); // Static image files serve kar rahe hain

// === User Registration ===
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body; // Request body se user details le rahe hain

    // Check kar rahe hain ki email already registered hai ya nahi
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(200).send(existingUser); // Agar user already hai toh response bhej rahe hain

    // New user create kar rahe hain aur database mein save kar rahe hain
    const user = new User({ name, email, password: password || null });
    const result = await user.save(); // User ko save kar rahe hain
    res.status(201).send(result); // User save hone ke baad response bhej rahe hain
  } catch (err) {
    console.error('Registration error:', err); // Error handle kar rahe hain
    res.status(500).send({ message: 'Server error during registration' }); // Agar error aaye toh server error bhej rahe hain
  }
});

// === User Login (Manual + Google) ===
app.post('/login', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (email && password) {
      // Manual login: email + password
      const user = await User.findOne({ email, password }).select("-password");
      return user
        ? res.send(user)
        : res.status(401).send({ message: "No user found" });
    }

    if (email && !password) {
      // Google Login
      let googleUser = await User.findOne({ email }).select("-password");

      if (!googleUser) {
        // Google user not found, create new one
        const newUser = new User({
          name: name || "Google User", // fallback if name is not provided
          email,
          password: null
        });
        googleUser = await newUser.save();
      }

      return res.send(googleUser);
    }

    res.status(400).send({ message: "Invalid request" });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send({ message: "Server error during login" });
  }
});


// === Get All Products ===
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Fetched products:", products);  // Log the products
    res.json(products);
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).send("Server error");
  }
});



// === Get Orders by User Email ===
app.get('/orders/:userEmail', async (req, res) => {
  try {
    // User email ke basis pe orders fetch kar rahe hain
    const orders = await Order.find({ 'user.email': req.params.userEmail });
    if (!orders.length) return res.status(404).json({ message: "No orders found." });
    res.status(200).json(orders); // Agar orders milte hain toh unhe response mein bhej rahe hain
  } catch (error) {
    console.error("Error fetching orders:", error); // Error handle kar rahe hain
    res.status(500).json({ error: "Failed to fetch orders" }); // Agar error aaye toh error response bhej rahe hain
  }
});

// === Cancel/Delete Order ===
app.delete('/orders/:id', async (req, res) => {
  try {
    // Order ko delete kar rahe hain
    const result = await Order.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order cancelled successfully" }); // Agar successfully cancel hota hai toh success message bhej rahe hain
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel order" }); // Agar error aaye toh error bhej rahe hain
  }
});

// === Razorpay Setup ===
const razorpay = new Razorpay({
  key_id: 'rzp_test_mH1BweJ0lhBp1g', // Razorpay test key
  key_secret: 'TffqU8GcfdOCX1cvMeBaSNNP' // Razorpay test secret key
});

// === Create Razorpay Order ===
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount jo payment mein dena hai
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a valid INR number" });
    }

    const options = {
      amount: parseInt(amount) * 100, // INR ko paise mein convert kar rahe hain
      currency: "INR", // Currency INR set kar rahe hain
      receipt: `receipt_order_${Date.now()}` // Receipt ka unique ID generate kar rahe hain
    };

    const order = await razorpay.orders.create(options); // Razorpay order create kar rahe hain
    res.status(201).json({ order }); // Order successfully create hone par response bhej rahe hain
  } catch (err) {
    console.error("Razorpay Error:", err); // Error handle kar rahe hain
    res.status(500).json({ message: "Failed to create Razorpay order" }); // Agar order create nahi hota toh error bhej rahe hain
  }
});

// === Place Order (COD or Razorpay) ===
app.post('/orders', async (req, res) => {
  try {
    const { user, address, products, totalAmount, paymentMethod, razorpayPaymentId, razorpayOrderId } = req.body;

    if (!user || !address || !products || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let paymentStatus = "pending";  // Default payment status ko "pending" set kar rahe hain

    if (paymentMethod === "razorpay") {
      // Agar payment method Razorpay hai toh payment status ko "paid" set kar rahe hain
      if (razorpayPaymentId && razorpayOrderId) {
        paymentStatus = "paid";
      } else {
        paymentStatus = "failed";
      }
    } else if (paymentMethod === "cod") {
      paymentStatus = "pending";  // Cash on delivery ke liye payment status pending hi rahega
    }

    // Naya order create kar rahe hain
    const newOrder = new Order({
      user,
      address,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus, // Dynamically set kiya gaya payment status
      paymentDetails: paymentMethod === "razorpay" ? {
        razorpayPaymentId,
        razorpayOrderId
      } : {},
      createdAt: new Date()  // Order ka creation time set kar rahe hain
    });

    const savedOrder = await newOrder.save(); // Order ko database mein save kar rahe hain
    sendOrderConfirmationEmail(user.email, savedOrder); // Order confirmation email bhej rahe hain
    res.status(201).json(savedOrder); // Order successfully place hone par response bhej rahe hain
  } catch (err) {
    console.error('Error placing order:', err); // Error handle kar rahe hain
    res.status(500).json({ message: 'Failed to place order' }); // Agar order place nahi hota toh error bhej rahe hain
  }
});

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});