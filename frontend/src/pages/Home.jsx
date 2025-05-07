import React, { useState, useEffect } from 'react';

const Home = () => {
  // Banner ka current index track karne ke liye state
  const [currentBanner, setCurrentBanner] = useState(0);

  // Banner images ka array
  const banners = [
    "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
    "https://img.freepik.com/premium-psd/poster-website-line-moving-goods_1149671-52.jpg?semt=ais_hybrid&w=740",
    "https://st5.depositphotos.com/1006714/64877/v/450/depositphotos_648778226-stock-illustration-isometric-cartoon-online-shopping-concept.jpg",
    "https://t3.ftcdn.net/jpg/03/14/28/96/360_F_314289672_yEQMeEM4k2Z80wAeJmr0BQM01ajOPhVD.jpg"
  ];

  // Har 3 second mein banner auto change karega
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length); // cyclic rotation
    }, 3000);

    // Jab component unmount ho to interval band karo
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10 px-4 sm:px-8 md:px-16">

      {/* Main heading */}
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-4 animate__animated animate__fadeIn animate__delay-1s">
        Welcome to Our E-commerce Store
      </h1>

      {/* Description paragraph */}
      <p className="text-lg sm:text-xl text-gray-700 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
        Discover amazing products at great prices. Shop now for the best deals! We offer the best products with exclusive offers, perfect for every occasion.
      </p>

      {/* Banner slider section */}
      <div className="w-full max-w-5xl mx-auto overflow-hidden mb-8 relative rounded-xl shadow-xl">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-64 sm:h-80 md:h-96 lg:h-112 xl:h-128"
            >
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Extra features/info section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Why Shop With Us?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>✨ Free Shipping on all orders above $50</li>
          <li>🔄 Easy Returns and Exchanges</li>
          <li>📞 24/7 Customer Support</li>
          <li>🔒 Secure Payment Options</li>
        </ul>
      </div>

      {/* Button to navigate to Products page */}
      <div className="mt-8">
        <a 
          href="/products"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default Home;
