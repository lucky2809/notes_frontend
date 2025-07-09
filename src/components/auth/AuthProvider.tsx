import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL; // Change for production

export const AuthProvider = ({ children }: { children: any }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("access_token")
    );
    const [loading, setLoading] = useState(true);

    const verifyToken = async (token: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/verify-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (!res.ok) throw new Error("Token verification failed");

            const data = await res.json();
            setUser(data.user);
            localStorage.setItem("user_data", JSON.stringify(data.user || {}));

        } catch (err) {
            console.error("Token verification failed:", err);
            logout(); // Clear token if invalid
        } finally {
            setLoading(false);
        }
    };

    const login = async (newToken: string) => {
        localStorage.setItem("access_token", newToken);
        setToken(newToken);
        await verifyToken(newToken);
        // toast.success("Login Succesfull")
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("user_email");

        setToken(null);
        setUser(null);
        navigate("/signin")
    };

    useEffect(() => {
        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, loading, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing auth
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
