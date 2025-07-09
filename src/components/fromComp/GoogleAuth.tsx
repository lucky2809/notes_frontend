// GoogleLogin.tsx
import React from "react";
import { toast } from "react-toastify";

const GOOGLE_AUTH_URL = `${import.meta.env.VITE_API_URL}/auth/google`; // Change to your backend URL

const GoogleLogin: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
    toast.success("Login Succesfull")
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
