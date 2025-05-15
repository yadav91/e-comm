import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Listen for manual login/logout updates
  React.useEffect(() => {
    const syncUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("userChanged", syncUser);
    return () => window.removeEventListener("userChanged", syncUser);
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(new Event("userChanged")); // Trigger update
    setUser(userData);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged")); // Trigger update
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 sm:px-6 md:px-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-blue-600">MyStore</div>

        {/* Hamburger */}
        <button
          className="sm:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Links */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:flex sm:items-center sm:justify-between sm:space-x-6 mt-4 sm:mt-2 transition-all`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
          {user && (
            <>
              <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
              <Link to="/orders" className="text-gray-700 hover:text-blue-600">My Orders</Link>
            </>
          )}
        </div>

        {/* Auth Section */}
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border"
                />
              )}
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log("Google Login Failed")}
                shape="pill"
                theme="filled_blue"
                size="medium"
                text="signin_with"
              />
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
