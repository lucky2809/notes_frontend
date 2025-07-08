// GoogleLogin.tsx
import React from "react";

const GOOGLE_AUTH_URL = "http://localhost:8000/api/auth/google"; // Change to your backend URL

const GoogleLogin: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
