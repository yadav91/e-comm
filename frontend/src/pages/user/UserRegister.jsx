import React, { useState } from 'react'; // React aur useState hook ko import kar rahe hain
import { Link, useNavigate } from 'react-router-dom'; // useNavigate hook aur Link component ko import kar rahe hain
import { GoogleLogin } from '@react-oauth/google'; // GoogleLogin component ko import kar rahe hain
import  jwtDecode  from 'jwt-decode';  // ✅ JWT token ko decode karne ke liye jwt-decode import kar rahe hain

const UserRegister = () => {
  // State variables define kar rahe hain
  const [name, setName] = useState(''); // Username ke liye state
  const [email, setEmail] = useState(''); // Email ke liye state
  const [password, setPassword] = useState(''); // Password ke liye state
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password ke liye state
  const [error, setError] = useState(''); // Error message ke liye state
  const navigate = useNavigate(); // Navigation ke liye hook

  // Register function jo form submit hone par user ko register karta hai
  const handleRegister = async () => {
    // Agar koi bhi field empty hai to error show karenge
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Agar password aur confirm password match nahi karte, to error show karenge
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Server par registration request bhej rahe hain
      const response = await fetch('https://e-comm-backend-y3z6.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // User ka data JSON mein bhej rahe hain
      });

      const data = await response.json(); // Response ko JSON mein convert kar rahe hain

      if (response.ok) { // Agar registration successful hota hai
        localStorage.setItem('user', JSON.stringify(data)); // User ko localStorage mein save kar rahe hain
        navigate('/'); // Home page par redirect kar rahe hain
      } else {
        setError(data.message || 'Registration failed'); // Agar koi error aata hai, to usse show karenge
      }
    } catch (err) {
      console.error(err); // Agar koi error hota hai, to usse console mein log karenge
      setError('Something went wrong. Please try again.'); // Error message dikhayenge
    }
  };

  // Google login success hone par yeh function call hota hai
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Google se mila credential decode kar rahe hain
      const decoded = jwtDecode(credentialResponse.credential);
      const googleUser = {
        name: decoded.name, // Decoded data se name aur email nikaal rahe hain
        email: decoded.email,
      };
  
      // Google user data ko server par register karne ke liye bhej rahe hain
      const res = await fetch('https://e-comm-backend-y3z6.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleUser), // Google user ka data JSON format mein bhej rahe hain
      });
  
      const userData = await res.json(); // Server se response ko JSON mein convert kar rahe hain
      localStorage.setItem('user', JSON.stringify(userData)); // User data ko localStorage mein store kar rahe hain
      navigate('/'); // User ko home page par redirect kar rahe hain
    } catch (err) {
      console.error('Google login error:', err); // Agar Google login mein koi error aaye, to usse log kar rahe hain
      alert('Google Login failed'); // Google login fail hone par alert dikhate hain
    }
  };

  // Google login error hone par yeh function call hota hai
  const handleGoogleError = () => {
    console.error("Google login error"); // Error ko console mein log kar rahe hain
    alert("Google login failed"); // Google login fail hone par alert dikhate hain
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      {/* Outer container jo form ko center me rakhta hai */}
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        {/* Form ka heading */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">User Register</h1>

        {/* Agar error hai to usko display kar rahe hain */}
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          value={name} // Name ki value ko state se bind kar rahe hain
          onChange={(e) => setName(e.target.value)} // Jab user input kare, to name update kar rahe hain
          className="w-full p-3 mb-4 border rounded-lg"
        />
        
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          value={email} // Email ki value ko state se bind kar rahe hain
          onChange={(e) => setEmail(e.target.value)} // Jab user input kare, to email update kar rahe hain
          className="w-full p-3 mb-4 border rounded-lg"
        />
        
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password} // Password ki value ko state se bind kar rahe hain
          onChange={(e) => setPassword(e.target.value)} // Jab user input kare, to password update kar rahe hain
          className="w-full p-3 mb-4 border rounded-lg"
        />
        
        {/* Confirm Password input field */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword} // Confirm password ki value ko state se bind kar rahe hain
          onChange={(e) => setConfirmPassword(e.target.value)} // Jab user input kare, to confirm password update kar rahe hain
          className="w-full p-3 mb-6 border rounded-lg"
        />

        {/* Register button */}
        <button
          onClick={handleRegister} // Register button click hone par handleRegister function call hoga
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </button>

        {/* OR separator */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Login link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister; // UserRegister component ko export kar rahe hain
