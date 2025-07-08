// src/pages/OAuthSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from query params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("token", token)
    if (token) {
      // Save to localStorage (or cookie if you prefer)
      localStorage.setItem("access_token", token);

      // Redirect to your protected route
      navigate("/");
    } else {
      // Redirect to login if no token found
      navigate("/login");
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
