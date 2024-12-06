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
import Loading from "@/components/layouts/loading";

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
      const decoded = jwt.decode(accessToken) as { user: User } | null; // Decode the payload

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
      console.error("Login failed:", error);
      throw new Error("Invalid email or password");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    destroyCookie(null, "authToken", { path: "/" });
    router.push("/login");
  };

  // Parse `authToken` from cookies on initial load and set the user state
  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.authToken;

    if (token) {
      try {
        const decoded = jwt.decode(token) as { user: User } | null;

        if (decoded && decoded.user) {
          setUser(decoded.user); // Set the user state if token is valid
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        logout(); // Invalidate token and clear user if decoding fails
      }
    }

    setLoading(false); // Mark loading as complete after processing
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {!loading ? children : <Loading/>} {/* Show a loading indicator */}
    </AuthContext.Provider>
  );
};
