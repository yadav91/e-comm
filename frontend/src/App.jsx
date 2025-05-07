// Import necessary modules from React and React Router
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import common components
import Nav from "./Nav";
import Footer from "./Footer";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from './pages/MyOrders';  // My Orders page
import NotFound from "./pages/NotFound";  // 404 Page Not Found

// Main App component
function App() {
  return (
    // Router wraps the whole app to enable routing
    <Router>
      {/* Navigation bar */}
      <Nav />

      {/* Define all routes here */}
      <Routes>
        <Route path="/" element={<Home />} />                 {/* Home page */}
        <Route path="/about" element={<About />} />           {/* About page */}
        <Route path="/contact" element={<Contact />} />       {/* Contact page */}
        <Route path="/products" element={<Products />} />     {/* Products page */}
        <Route path="/login" element={<UserLogin />} />       {/* User login page */}
        <Route path="/register" element={<UserRegister />} /> {/* User register page */}
        <Route path="/cart" element={<Cart />} />             {/* Cart page */}
        <Route path="/checkout" element={<Checkout />} />     {/* Checkout page */}
        <Route path="/orders" element={<MyOrders />} />       {/* My Orders page */}
        <Route path="*" element={<NotFound />} />             {/* 404 Page */}
      </Routes>

      {/* Footer component */}
      <Footer />
    </Router>
  );
}

// Export the App component
export default App;
