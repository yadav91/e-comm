import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white mt-10 border-t">
      <div className="container mx-auto px-6 text-center">
        {/* Copyright */}
        <p className="text-sm mb-4">
          &copy; 2025. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="mb-4">
          <a href="#" className="text-gray-400 hover:text-blue-500 mx-3">
            <i className="fab fa-facebook-f"></i> {/* Facebook Icon */}
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-500 mx-3">
            <i className="fab fa-twitter"></i> {/* Twitter Icon */}
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-500 mx-3">
            <i className="fab fa-instagram"></i> {/* Instagram Icon */}
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-500 mx-3">
            <i className="fab fa-linkedin-in"></i> {/* LinkedIn Icon */}
          </a>
        </div>

        {/* Footer Links */}
        <div className="mt-4 text-sm text-gray-500">
          <a href="#" className="hover:text-blue-600 mx-2">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 mx-2">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 mx-2">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
