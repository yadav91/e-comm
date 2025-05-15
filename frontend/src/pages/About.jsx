import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 md:px-16 lg:px-32">

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-6">
        About Us
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-center text-gray-600 mb-10">
        We are a leading e-commerce store offering great deals and products. Our goal is to provide high-quality items at affordable prices.
      </p>

      {/* Our Story */}
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">Our Story</h2>
        <p className="text-sm sm:text-base text-gray-700">
          Founded in 2021, we focus on delivering great customer service, a wide selection of products, and unbeatable prices. Our platform is easy to use and offers a seamless shopping experience.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
        <p className="text-sm sm:text-base text-gray-700">
          Our mission is to be the most trusted e-commerce store by offering high-quality products and an exceptional shopping experience.
        </p>
      </div>

      {/* Core Values */}
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Customer First</h3>
            <p className="text-gray-700 text-sm sm:text-base">We prioritize customer satisfaction above all else.</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Integrity</h3>
            <p className="text-gray-700 text-sm sm:text-base">We uphold honesty, transparency, and responsibility in everything we do.</p>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <img src="https://via.placeholder.com/100" alt="Shivam Yadav" className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Shivam Yadav</h3>
            <p className="text-sm text-gray-600">Founder & CEO</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <img src="https://via.placeholder.com/100" alt="Shivam Yadav" className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Shivam Yadav</h3>
            <p className="text-sm text-gray-600">Developer</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 p-6 sm:p-8 rounded-lg shadow text-center text-white mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Get in Touch</h2>
        <p className="mb-4 text-sm sm:text-base">Have questions or feedback? Reach out to us anytime!</p>
        <Link
          to="/contact"
          className="inline-block px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default About;
