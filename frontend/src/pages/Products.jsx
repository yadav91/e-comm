import React, { useState, useEffect } from 'react';

const Products = () => {
  // State for products and loading state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://e-comm-backend-y3z6.onrender.com/products');
        const data = await response.json();
        console.log(data);  // Log the fetched data
        setProducts(data);  // Update state with fetched products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem('user')); // Check if user is logged in
    if (!user) {
      alert('Please login to add items to the cart.'); // Alert if user is not logged in
      return;
    }

    // Get the existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increase the quantity
      existingCart[existingProductIndex].quantity += 1;
    } else {
      // Otherwise, add the product to the cart with quantity 1
      existingCart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Product added to cart!'); // Show success message
  };

  // Display loading message while fetching data
  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Products
      </h1>

      {/* Products list displayed in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 bg-white"
          >
            <div className="overflow-hidden rounded-lg mb-4">
              {/* Displaying product image */}
              <img
                src={`https://e-comm-backend-y3z6.onrender.com/${product.image}`}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            </div>

            {/* Product details */}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-600 font-medium">₹{product.price}</p>

            {/* Add to cart button */}
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
