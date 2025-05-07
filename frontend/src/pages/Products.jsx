// React aur hooks import kar rahe hain
import React, { useState, useEffect } from 'react';

const Products = () => {
  // Products aur loading ke liye state banayi
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Component load hone par products fetch karo
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products'); // API se data le rahe hain
        const data = await response.json();
        setProducts(data); // Products ko state mein set kar rahe hain
        setLoading(false); // Loading false kar rahe hain
      } catch (error) {
        console.error('Error fetching products:', error); // Agar error aaye to console mein dikhao
        setLoading(false); // Loading false kar rahe hain
      }
    };

    fetchProducts(); // Function call
  }, []);

  // Cart mein product add karne ka function
  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem('user')); // User check kar rahe hain
    if (!user) {
      alert('Please login to add items to the cart.'); // Agar login nahi kiya to alert
      return;
    }

    // Pehle se cart mein kya hai, usko le rahe hain
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check kar rahe hain product already cart mein hai ya nahi
    const existingProductIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // Agar already hai to quantity badhao
      existingCart[existingProductIndex].quantity += 1;
    } else {
      // Agar nahi hai to product add karo with quantity 1
      existingCart.push({ ...product, quantity: 1 });
    }

    // Cart ko localStorage mein save karo
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Product added to cart!'); // Success message
  };

  // Jab tak data load ho raha hai, loading message dikhao
  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Products
      </h1>

      {/* Products list grid mein dikhana */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id} // Har product ke liye unique key
            className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 bg-white"
          >
            {/* Product image */}
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={`http://localhost:5000${product.image}`} // Image ka path
                alt={product.name}
                className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>

            {/* Product details */}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-600 font-medium">₹{product.price}</p>

            {/* Add to Cart button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
