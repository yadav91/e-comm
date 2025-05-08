import React, { useState } from 'react'; // React aur useState hook import kar rahe hain
import { useNavigate, Link } from 'react-router-dom'; // useNavigate hook navigation ke liye aur Link component routing ke liye
import { GoogleLogin } from '@react-oauth/google'; // Google Login component import kar rahe hain
import jwtDecode from 'jwt-decode';  // ✅ JWT token ko decode karne ke liye jwt-decode import kar rahe hain

const UserLogin = () => {
  const [email, setEmail] = useState(''); // email ki state banayi hai jo initially empty hai
  const [password, setPassword] = useState(''); // password ki state banayi hai jo initially empty hai
  const navigate = useNavigate(); // navigate hook jo page redirect karne ke liye use hota hai

  // Login function jo email aur password ke sath user ko login karata hai
  const handleLogin = async () => {
    if (email && password) { // Check karte hain ki email aur password diye gaye hain
      try {
        // Fetch request send kar rahe hain server ko login ke liye
        const response = await fetch('https://e-comm-backend-y3z6.onrender.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }), // Email aur password ko JSON format mein send kar rahe hain
        });

        const result = await response.json(); // Response ko JSON mein convert kar rahe hain

        if (result.name) { // Agar result mein name aa jata hai, matlab login successful hai
          localStorage.setItem('user', JSON.stringify(result)); // User data ko localStorage mein store kar rahe hain
          navigate('/'); // User ko home page pe redirect kar rahe hain
        } else {
          alert('Invalid login credentials'); // Agar credentials invalid hain, alert show kar rahe hain
        }
      } catch (error) {
        console.error('Login error:', error); // Agar API call mein koi error aaye, to error log kar rahe hain
        alert('Login failed. Try again.'); // Login fail hone par user ko alert dikhate hain
      }
    } else {
      alert('Please fill all fields'); // Agar email ya password missing ho, to alert dikhate hain
    }
  };

  // Google login success hone par yeh function call hota hai
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Google se mile hue credential ko decode kar rahe hain
      const decoded = jwtDecode(credentialResponse.credential);
      const googleUser = {
        name: decoded.name, // Decoded data se name aur email nikaal rahe hain
        email: decoded.email,
      };

      // Google user data ko server par login karne ke liye bhej rahe hain
      const res = await fetch('https://e-comm-backend-y3z6.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleUser), // Google user ka data JSON format mein bhej rahe hain
      });

      const userData = await res.json(); // Server se response ko JSON mein convert kar rahe hain
      localStorage.setItem('user', JSON.stringify(userData)); // User data ko localStorage mein store kar rahe hain
      navigate('/'); // User ko home page pe redirect kar rahe hain
    } catch (err) {
      console.error('Google login error:', err); // Agar Google login mein koi error aaye, to error log kar rahe hain
      alert('Google Login failed'); // Google login fail hone par user ko alert dikhate hain
    }
  };

  // Google login error hone par yeh function call hota hai
  const handleGoogleError = () => {
    console.error("Google login error"); // Error ko log kar rahe hain
    alert("Google login failed"); // Google login fail hone par user ko alert dikhate hain
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Login form ka outer container */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Login</h2>

        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          value={email} // email ki value ko state se bind kar rahe hain
          onChange={(e) => setEmail(e.target.value)} // email ko update kar rahe hain jab user input kare
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />
        
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password} // password ki value ko state se bind kar rahe hain
          onChange={(e) => setPassword(e.target.value)} // password ko update kar rahe hain jab user input kare
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md"
        />
        
        {/* Login button */}
        <button
          onClick={handleLogin} // Login button click hone par handleLogin function call hoga
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        {/* OR separator */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Google Login button */}
        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        {/* Link to register page */}
        <p className="mt-4 text-center text-sm text-gray-600">
          New user?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin; // UserLogin component ko export kar rahe hain
