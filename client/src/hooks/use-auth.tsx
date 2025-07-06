import { createContext, useContext, useState, ReactNode } from "react";
import { apiCall } from "../lib/api";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("auth_user") || null;
  });

  // Dummy login logic (replace with real API call)
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}; 