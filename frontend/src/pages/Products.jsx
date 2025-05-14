import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://e-comm-backend-y3z6.onrender.com/products');
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to add items to the cart.');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Product added to cart!');
  };

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center">No products available.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 bg-white">
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={`https://e-comm-backend-y3z6.onrender.com${product.image}`}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            </div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-600 font-medium">₹{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)} // ✅ Fixed: Connected function
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
