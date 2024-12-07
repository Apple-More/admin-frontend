"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { setCookie, destroyCookie, parseCookies } from "nookies"; // For cookie-based auth
import { loginService } from "@/services/LoginServices";
import jwt from "jsonwebtoken";
import { User } from "@/types/UserType";
import { toast } from "react-toastify";

// Define the structure of the AuthContext
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

// Props for AuthProvider
export interface AuthProviderProps {
  children: ReactNode; // Children to be wrapped by the provider
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Current user state
  const [loading, setLoading] = useState<boolean>(true); // Loading state for auth status
  const router = useRouter();
  const isAuthenticated = !!user; // Derived state for authentication

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password);

      const accessToken = response.data.data.accessToken;
      localStorage.setItem("jwt_token", accessToken);
      const decoded = jwt.decode(accessToken) as { user: User } | null; // Cast decoded payload

      if (!decoded || !decoded.user) {
        throw new Error("Invalid token: User not found in payload");
      }

      const user = decoded.user;

      // Store JWT in cookies
      setCookie(null, "authToken", accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      setUser(user);
      router.push("/");
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Login failed.");
      toast.error("Login failed.");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    destroyCookie(null, "authToken", { path: "/" });
    router.refresh(); // Force a re-render of the app
    router.push("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken) {
      const decoded = jwt.decode(storedToken) as { user: User } | null;
      if (decoded && decoded.user) {
        setUser(decoded.user);
      }
    }
    setLoading(false); // Set loading to false after user is retrieved
  }, []);

  // Store user in localStorage when it changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
