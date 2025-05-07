import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">

      {/* Heading */}
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-4">
        About Us
      </h1>

      {/* Description */}
      <p className="text-lg text-center text-gray-600 mb-8">
        We are a leading e-commerce store offering great deals and products. Our goal is to provide high-quality items at affordable prices.
      </p>

      {/* Our Story Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-base text-gray-700">
          Founded in 2021, we focus on delivering great customer service, a wide selection of products, and unbeatable prices. Our platform is easy to use and offers a seamless shopping experience.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-base text-gray-700">
          Our mission is to be the most trusted e-commerce store by offering high-quality products and an exceptional shopping experience.
        </p>
      </div>

      {/* Core Values Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Customer First</h3>
            <p className="text-gray-700 text-sm">We prioritize customer satisfaction above all else.</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Integrity</h3>
            <p className="text-gray-700 text-sm">We uphold honesty, transparency, and responsibility in everything we do.</p>
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            {/* Team Member 1 */}
            <img src="https://via.placeholder.com/100" alt="Shivam Yadav" className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Shivam Yadav</h3>
            <p className="text-sm text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center">
            {/* Team Member 2 */}
            <img src="https://via.placeholder.com/100" alt="Shivam Yadav" className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Shivam Yadav</h3>
            <p className="text-sm text-gray-600">Developer</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 p-6 rounded-lg shadow-sm text-center text-white mb-8">
        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-4">Have questions or feedback? Reach out to us anytime!</p>
        <a href="/contact" className="inline-block px-6 py-2 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-200 transition duration-300">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default About;
