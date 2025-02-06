import React, { createContext, useState, useEffect, useContext } from "react";
import { LoginAPI } from "../api/services/login";
import { LogoutAPI } from "../api/services/logout";
import { usePermission } from "../helpers/Providers/PermissionProvider";
interface AuthContextType {
  user: any | null;
  loginUser: (
    username: string,
    password: string
  ) => Promise<{ message: string }>;
  logoutUser: () => void;
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
  const { setPermission } = usePermission();

  useEffect(() => {
    const dataUser:any = localStorage.getItem("user");
    setUser(JSON.parse(dataUser));
  }, []);

  const loginUser = async (username: string, password: string) => {
    const response = await LoginAPI.login({ username, password });
    if (response.access_token) {
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("permissions", JSON.stringify(response.permissions));
      setPermission(JSON.stringify(response.permissions));
      localStorage.setItem("role", response.role);
      setUser(response.user);
      setNotification(response?.notifications);
      setAnnouncement(response?.announcement);
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
      setPermission(null);
      return { message: response.message };
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        setUser,
        notification,
        announcement,
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
