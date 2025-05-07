import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <GoogleOAuthProvider clientId="136503552458-lr5blp2jqg5l4qt4noh6qlp2u70rgpeq.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>


  
  </StrictMode>
);
