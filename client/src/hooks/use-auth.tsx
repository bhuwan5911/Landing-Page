// use-auth.tsx
// Provides authentication context and hooks for login/logout functionality across the app.
import { createContext, useContext, useState, ReactNode } from "react";
import { apiCall } from "../lib/api";

// Define the shape of the authentication context
interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider wraps the app and provides authentication state and actions
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("auth_user") || null;
  });

  // Login function (replace with real API call in production)
  const login = async (email: string, password: string) => {
    try {
      const res = await apiCall("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res && res.success) {
        setUser(email);
        localStorage.setItem("auth_user", email);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Logout function clears user state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}; 