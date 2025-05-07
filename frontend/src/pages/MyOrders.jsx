// React aur hooks import kar rahe hain
import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // orders ko store karne ke liye state

  // Orders fetch karne ka function
  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // localStorage se user data le rahe hain
    if (!user) return; // agar user nahi mila to kuch mat karo

    try {
      const res = await fetch(`http://localhost:5000/orders/${user.email}`); // backend se orders la rahe hain
      const data = await res.json();

      if (res.ok) {
        setOrders(data); // agar response sahi hai to orders set karo
      } else {
        console.error("Failed to fetch orders:", data.message); // agar error aaye to console mein dikhao
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err); // fetch ke time error handle
    }
  };

  // Component mount hone par orders fetch karo
  useEffect(() => {
    fetchOrders();
  }, []);

  // Order cancel karne ka function
  const handleCancel = async (orderId) => {
    const confirm = window.confirm("Are you sure you want to cancel this order?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "DELETE", // order delete karne ke liye DELETE request
      });

      if (!res.ok) {
        throw new Error("Cancel failed"); // agar kuch galat ho gaya to error throw karo
      }

      alert("Order cancelled."); // success message
      fetchOrders(); // fresh list laao cancel ke baad
    } catch (err) {
      console.error(err); // error print karo
      alert("Failed to cancel order."); // alert dikhao agar cancel nahi hua
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">My Orders</h2>

      {/* Agar orders empty hain to message dikhaye */}
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        // Har order ko render karo
        orders.map((order, index) => (
          <div key={order._id} className="border p-4 rounded-lg mb-6 shadow bg-white">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Order #{index + 1}</h3>
              {/* Cancel button */}
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => handleCancel(order._id)}
              >
                Cancel Order
              </button>
            </div>

            {/* Order ka details section */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod?.toUpperCase() || "COD"}</p>
              <p><strong>Payment Status:</strong> 
                {order.paymentStatus === "paid" 
                  ? "Paid" 
                  : order.paymentStatus === "pending" 
                  ? "Pending" 
                  : "Cancelled"}
              </p>
              <p><strong>Total Items:</strong> {order.products.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            {/* Address section */}
            <div className="mt-4 text-sm">
              <h4 className="font-semibold mb-2 text-gray-800">Delivery Address:</h4>
              <p>{order.address?.fullName}</p>
              <p>{order.address?.street}, {order.address?.city}</p>
              <p>{order.address?.state} - {order.address?.zipCode}</p>
              <p>Phone: {order.address?.phone}</p>
            </div>

            {/* Products section */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Products:</h4>
              <div className="space-y-3">
                {order.products.map((product, idx) => (
                  <div key={idx} className="flex items-center border-b pb-2 gap-4">
                    <img
                      src={product.image.startsWith('/images/') 
                        ? `http://localhost:5000${product.image}` 
                        : `http://localhost:5000/images/${product.image}`} // Image path
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
