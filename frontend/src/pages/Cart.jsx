import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // Redirect to login page if no user is found
      navigate("/user/login");
    } else {
      // Get cart items from localStorage and set state
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    }
  }, [navigate]); // Runs when component mounts or navigate changes

  // Function to update the quantity of a product in the cart
  const updateQuantity = (index, delta) => {
    const updatedCart = [...cartItems]; // Create a copy of the cart
    updatedCart[index].quantity += delta; // Increase or decrease quantity
    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1; // Prevent quantity from going below 1
    }
    setCartItems(updatedCart); // Update the state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage
  };

  // Function to remove an item from the cart
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index); // Filter out the item at the given index
    setCartItems(updatedCart); // Update the state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage
  };

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        // If no items are in the cart, show a message
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {/* Loop through each cart item and display it */}
            {cartItems.map((item, index) => {
              const imageUrl = item.image.startsWith("http")
                ? item.image
                : `http://localhost:5000/images/${item.image.replace(
                    /^\/images\//,
                    ""
                  )}`;

              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4"
                >
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-md"
                  />

                  <div className="flex-1 md:ml-6 text-center md:text-left">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.description || "No description available."}
                    </p>

                    <div className="flex justify-center md:justify-start items-center space-x-3 mt-2">
                      {/* Buttons to update quantity */}
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-blue-600 font-semibold text-lg">
                      ₹{item.price * item.quantity}
                    </span>
                    <br />
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 text-sm hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer with total price and checkout button */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6">
            <div className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
              Total: ₹{totalPrice}
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
