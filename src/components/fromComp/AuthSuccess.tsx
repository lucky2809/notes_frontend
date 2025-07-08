// src/pages/OAuthSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  const verifyToken = async (token: string) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (!res.ok) throw new Error("Token verification failed");

            const data = await res.json();
 
            localStorage.setItem("user_data", JSON.stringify(data.user || {}));

        } catch (err) {
            console.error("Token verification failed:", err);
        } 
    };

  useEffect(() => {
    // Get token from query params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("token", token)
    if (token) {
      // Save to localStorage (or cookie if you prefer)
      localStorage.setItem("access_token", token);
      verifyToken(token)

      // Redirect to your protected route
      navigate("/");
    } else {
      // Redirect to login if no token found
    //   navigate("/login");
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
