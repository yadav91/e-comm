import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const navigate = useNavigate();

  const banners = [
    "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
    "https://img.freepik.com/premium-psd/poster-website-line-moving-goods_1149671-52.jpg?semt=ais_hybrid&w=740",
    "https://st5.depositphotos.com/1006714/64877/v/450/depositphotos_648778226-stock-illustration-isometric-cartoon-online-shopping-concept.jpg",
    "https://t3.ftcdn.net/jpg/03/14/28/96/360_F_314289672_yEQMeEM4k2Z80wAeJmr0BQM01ajOPhVD.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 sm:px-6 lg:px-20 py-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-blue-600 mb-6 leading-tight">
        Welcome to Our E-commerce Store
      </h1>

      {/* Subtext */}
      <p className="text-base sm:text-lg md:text-xl text-gray-700 text-center mb-8 max-w-4xl leading-relaxed">
        Discover amazing products at great prices. Shop now for the best deals! We offer the best products with exclusive offers, perfect for every occasion.
      </p>

      {/* Banner Slider */}
      <div className="w-full max-w-6xl overflow-hidden mb-10 relative rounded-xl shadow-xl">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-56 sm:h-72 md:h-96"
            >
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white shadow-xl rounded-xl px-6 py-8 w-full max-w-3xl mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-500 mb-4 text-center">
          Why Shop With Us?
        </h2>
        <ul className="space-y-3 text-gray-700 text-base sm:text-lg">
          <li>✨ Free Shipping on all orders above $50</li>
          <li>🔄 Easy Returns and Exchanges</li>
          <li>📞 24/7 Customer Support</li>
          <li>🔒 Secure Payment Options</li>
        </ul>
      </div>

      {/* CTA Button */}
      <button 
        onClick={handleShopNow}
        className="px-8 py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 hover:scale-105"
      >
        Shop Now
      </button>
    </div>
  );
};

export default Home;
