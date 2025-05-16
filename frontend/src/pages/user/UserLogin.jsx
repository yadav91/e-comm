import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('https://e-comm-backend-y3z6.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.name) {
        const userData = {
          name: result.name,
          email: result.email,
          picture: result.picture || "",
        };

        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event("userChanged"));
        navigate('/');
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Try again.');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        <div className="my-4 text-center text-gray-500">OR</div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => console.log("Google Login Failed")}
          shape="pill"
          theme="filled_blue"
          size="medium"
          text="signin_with"
        />

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

export default UserLogin;
