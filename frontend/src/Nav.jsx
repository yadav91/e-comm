// Import React and necessary modules from react-router-dom
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Import Google Login components
import { GoogleLogin } from '@react-oauth/google';
import  jwtDecode  from 'jwt-decode';

// Navigation bar component
const Nav = () => {
  const navigate = useNavigate();

  // Get user from local storage if available
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Handle Google login success
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential); // Decode token
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    // Save user data to local storage
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Update user state
    navigate("/"); // Go to home page
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
    setUser(null); // Clear user state
    navigate("/login"); // Go to login page
  };

  return (
    // Navigation bar layout
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Website logo or title */}
      <div className="text-2xl font-bold text-blue-600">MyStore</div>

      {/* Navigation links */}
      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>

        {/* Show different UI based on user login status */}
        {user ? (
          <>
            {/* If logged in */}
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
            <Link to="/orders" className="text-gray-700 hover:text-blue-600">My Orders</Link>
            <div className="flex items-center space-x-2">
              {/* User avatar and name */}
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-sm font-medium">{user.name}</span>
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* If not logged in, show Google login and register link */}
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log('Login Failed')}
              shape="pill"
              theme="filled_blue"
              size="medium"
              text="signin_with"
            />
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
