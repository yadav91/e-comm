// components/GoogleLoginButton.jsx
import { GoogleLogin } from '@react-oauth/google'; // Google login button ko import kar rahe hain
import { jwtDecode } from 'jwt-decode'; // JWT token ko decode karne ke liye jwt-decode import kar rahe hain

const GoogleLoginButton = () => {
  return (
    <GoogleLogin
      // Google login successful hone par yeh function call hota hai
      onSuccess={(credentialResponse) => {
        const token = credentialResponse.credential; // Raw JWT token ko credentialResponse se nikaal rahe hain
        const decoded = jwtDecode(token); // JWT token ko decode kar rahe hain jisme user ka information hota hai
        
        console.log("JWT Token:", token); // Console mein JWT token ko log kar rahe hain
        console.log("Decoded User:", decoded); // Decoded user info ko console mein log kar rahe hain
        
        // User information ko localStorage mein save kar rahe hain
        localStorage.setItem('user', JSON.stringify(decoded));

        // User ko home page par redirect kar rahe hain
        window.location.href = '/';
      }}
      
      // Agar login fail hota hai to yeh function call hota hai
      onError={() => {
        console.log('Login Failed'); // Login fail hone par error message console mein log kar rahe hain
      }}
    />
  );
};

export default GoogleLoginButton; // GoogleLoginButton component ko export kar rahe hain
