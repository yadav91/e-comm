import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import useNavigate

const Contact = () => {
  const navigate = useNavigate(); // 👈 initialize navigate

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form behavior

    // Optionally, add validation or logic here

    // Redirect to 404 page
    navigate('/404');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Contact Us
      </h1>

      <p className="text-xl text-center text-gray-700 mb-12">
        Koi bhi sawaal ho? Humein bina jhijhak contact karein. Hum madad ke liye yahan hain!
      </p>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get In Touch</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apna poora naam likhein"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apna email daalein"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Yahan apna message likhein"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
