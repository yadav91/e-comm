import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "",
  });

  const navigate = useNavigate();

  // 🔐 Redirect if user not logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
  }, [navigate]);

  // 💳 Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePlaceOrder = async () => {
    if (
      !form.fullName ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.postalCode ||
      !form.phone ||
      !form.paymentMethod
    ) {
      alert("Please fill all fields and select a payment method.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const products = JSON.parse(localStorage.getItem("cart")) || [];
    if (!user) return navigate("/login");
    if (products.length === 0) return alert("Your cart is empty.");

    const totalAmount = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderData = {
      user: { name: user.name, email: user.email },
      address: form,
      products: products.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount,
      paymentMethod: form.paymentMethod,
    };

    // ✅ Cash on Delivery
    if (form.paymentMethod === "cod") {
      try {
        const res = await fetch("https://e-comm-backend-y3z6.onrender.com/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (!res.ok) throw new Error("Order failed");
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        navigate("/orders");
      } catch (err) {
        console.error("Error placing COD order:", err);
        alert("Failed to place order.");
      }
    }

    // ✅ Razorpay Payment
    if (form.paymentMethod === "razorpay") {
      try {
        const razorRes = await fetch("https://e-comm-backend-y3z6.onrender.com/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
        });

        const razorData = await razorRes.json();
        if (!razorData.order) throw new Error("Failed to create Razorpay order");

        const options = {
          key: "rzp_test_mH1BweJ0lhBp1g",
          amount: razorData.order.amount,
          currency: "INR",
          name: "E-comm",
          description: "Order Payment",
          order_id: razorData.order.id,
          handler: async function (response) {
            try {
              const orderRes = await fetch("https://e-comm-backend-y3z6.onrender.com/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...orderData,
                  paymentStatus: "paid",
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                }),
              });

              if (orderRes.ok) {
                alert("Payment successful & order placed!");
                localStorage.removeItem("cart");
                navigate("/orders");
              } else {
                throw new Error("Failed to save order after payment.");
              }
            } catch (err) {
              console.error("Error processing Razorpay payment:", err);
              alert("Payment succeeded, but order saving failed.");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: form.phone,
          },
          theme: { color: "#3399cc" },
          redirect: true, // ✅ Important for mobile
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        // ⛔ Error logging for mobile test failures
        rzp.on("payment.failed", function (response) {
          console.error("Payment Failed:", response.error);
          alert("Payment Failed: " + response.error.description);
        });

      } catch (err) {
        console.error("Error initiating Razorpay:", err);
        alert("Failed to initiate Razorpay payment.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Checkout</h2>
      <form className="grid grid-cols-1 gap-4">
        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required className="p-2 border rounded" />
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" pattern="[0-9]{10}" required className="p-2 border rounded" />
        <input type="text" name="street" value={form.street} onChange={handleChange} placeholder="Street Address" required className="p-2 border rounded" />
        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required className="p-2 border rounded" />
        <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" required className="p-2 border rounded" />
        <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" pattern="[0-9]{6}" required className="p-2 border rounded" />

        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="p-2 border rounded w-full" required>
            <option value="" disabled>-- Select Payment Method --</option>
            <option value="cod">Cash on Delivery</option>
            <option value="razorpay">Pay with Razorpay</option>
          </select>
        </div>

        <button type="button" onClick={handlePlaceOrder} className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
