import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { Menu, X } from "lucide-react"; // Optional: For hamburger icon

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [menuOpen, setMenuOpen] = React.useState(false); // For mobile toggle

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 sm:px-6 md:px-10 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="text-xl sm:text-2xl font-bold text-blue-600">MyStore</div>

      {/* Hamburger for mobile */}
      <button
        className="sm:hidden text-gray-700 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links (Responsive) */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:flex flex-col sm:flex-row sm:items-center sm:space-x-6 absolute sm:static bg-white top-full left-0 w-full sm:w-auto shadow-md sm:shadow-none p-4 sm:p-0 transition-all`}
      >
        <Link to="/" className="text-gray-700 hover:text-blue-600 mb-2 sm:mb-0">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600 mb-2 sm:mb-0">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600 mb-2 sm:mb-0">Contact</Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-600 mb-2 sm:mb-0">Products</Link>

        {user ? (
          <>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 mb-2 sm:mb-0">Cart</Link>
            <Link to="/orders" className="text-gray-700 hover:text-blue-600 mb-2 sm:mb-0">My Orders</Link>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 sm:mt-0">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log("Login Failed")}
              shape="pill"
              theme="filled_blue"
              size="medium"
              text="signin_with"
            />
            <Link to="/register" className="text-gray-700 hover:text-blue-600 text-sm">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
