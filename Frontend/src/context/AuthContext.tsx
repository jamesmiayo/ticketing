import React, { createContext, useState, useEffect, useContext } from "react";
import { LoginAPI } from "../api/services/login";
import { LogoutAPI } from "../api/services/logout";
import { useExecuteToast } from "./ToastContext";

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginUser: (
    username: string,
    password: string
  ) => Promise<{ message: string }>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useExecuteToast();

  useEffect(() => {
    const initializeAuthState = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
        const userData = localStorage.getItem("userData");
        const parsedUserData =
          userData && typeof userData === "string"
            ? JSON.parse(userData)
            : null;
        setUser(parsedUserData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuthState();
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await LoginAPI.login({ username, password });
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("userData", JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        throw new Error("Invalid login response");
      }
      return { message: response.message };
    } catch (error: any) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      const response = await LogoutAPI.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setUser(null);
      setIsAuthenticated(false);
      return { message: response.message };
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
