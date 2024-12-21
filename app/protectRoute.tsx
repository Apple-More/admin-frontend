"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export const protectRoute = (WrappedComponent: React.FC<any>) => {
  return (props: any) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth(); // Use AuthContext values

    useEffect(() => {
      // Redirect to login only when not authenticated and not loading
      if (!isAuthenticated) {
        router.push("/auth/login"); // Redirect to login
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};
