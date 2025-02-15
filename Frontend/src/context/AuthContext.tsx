import React, { createContext, useState, useEffect, useContext } from "react";
import { LoginAPI } from "../api/services/login";
import { LogoutAPI } from "../api/services/logout";
import { validateToken } from "../api/services/validateToken";
import { usePermission } from "../helpers/Providers/PermissionProvider";
import { User } from "../api/services/user";

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginUser: (
    username: string,
    password: string
  ) => Promise<{ message: string }>;
  logoutUser: () => void;
  fetchUserNotification: () => void;
  setUser: any;
  notification: any | null;
  announcement: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [notification, setNotification] = useState<any | null>(null);
  const [announcement, setAnnouncement] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setPermission } = usePermission();

  useEffect(() => {
    const initializeAuthState = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await validateToken();
        if (response?.isValid) {
          setUser(response?.user);
          setIsAuthenticated(true);
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
      const response = await LoginAPI.login({ username, password });
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        localStorage.setItem(
          "permissions",
          JSON.stringify(response.permissions)
        );
        setPermission(JSON.stringify(response.permissions));
        localStorage.setItem("role", response.role);
        setUser(response.user);
        setIsAuthenticated(true);
        setNotification(response?.notifications)
        setAnnouncement(response?.announcement)

      } else {
        throw new Error("Invalid login response");
      }
      return { message: response.message };
  };

  const logoutUser = async () => {
    try {
      const response = await LogoutAPI.logout();
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      setPermission(null);
      return { message: response.message };
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const fetchUserNotification = async () => {
    try{
      const response = await User.getUserNotification();
      setPermission(JSON.stringify(response.permissions));
      localStorage.setItem("role", response.role);
      setNotification(response?.notifications)
      setAnnouncement(response?.announcement)
    }catch (error) {
      console.error("User.getUserNotification failed", error);
  }
}

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        fetchUserNotification,
        loginUser,
        logoutUser,
        setUser,
        notification,
        announcement
      }}
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
