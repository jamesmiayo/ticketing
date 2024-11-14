import React, { createContext, useState, useEffect, useContext } from "react";
import { LoginAPI } from "../api/services/login";
import { LogoutAPI } from "../api/services/logout";
import { validateToken } from "../api/services/validateToken";
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

  useEffect(() => {
    const initializeAuthState = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const isValid = await validateToken();
        if (isValid) {
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
          localStorage.clear();
        }
      }
      setLoading(false);
    };

    initializeAuthState();
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await LoginAPI.login({ username, password });
      console.log(response);
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("userData", JSON.stringify(response.user));
        localStorage.setItem("permissions", response.permissions);
        localStorage.setItem("role", response.role);
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
