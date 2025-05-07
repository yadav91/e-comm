const nodemailer = require('nodemailer');

// Create transporter object using Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yadavshivamc093@gmail.com',   // Your Gmail address
    pass: 'spwfllonbuotdjxs',             // Your app-specific password (no spaces!)
  },
});

// Function to send order confirmation email
const sendOrderConfirmationEmail = (userEmail, orderDetails) => {
  const { _id, user, products, totalAmount, createdAt } = orderDetails;
  const numberOfItems = products.reduce((total, product) => total + product.quantity, 0);

  // Generate the product list
  const productList = products
    .map(
      (product) => `- ${product.name} (Qty: ${product.quantity}) - ₹${product.price * product.quantity}`
    )
    .join('\n');

  // Email content
  const mailOptions = {
    from: 'DmartOrder@gmail.com',  // Updated to Dmart company email
    to: userEmail,                 // Recipient's email
    subject: `Order Confirmation - Order #${_id}`,
    text: `Dear ${user.name},

Your order has been successfully placed! Here are the details:

Order ID: ${_id}
Number of Items: ${numberOfItems}
Total Amount: ₹${totalAmount}
Ordered On: ${new Date(createdAt).toLocaleString()}

Items Ordered:
${productList}

Delivery Address:
${orderDetails.address.fullName}
${orderDetails.address.street}, ${orderDetails.address.city}, ${orderDetails.address.state} - ${orderDetails.address.postalCode}
Phone: ${orderDetails.address.phone}

Your order will be delivered within 2 days. Thank you for shopping with us!

Best regards,
E-comm (Dmart)`,  // Updated footer with company name "E-comm" and company email "DmartOrder@gmail.com"
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendOrderConfirmationEmail;
