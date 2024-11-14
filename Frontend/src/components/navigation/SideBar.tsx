import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton"; // Import ListItemButton
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Adjust import paths as necessary
import { useExecuteToast } from "../../context/ToastContext";
import { MdDashboard } from "react-icons/md";
import { BsTicketDetailed } from "react-icons/bs";

const Sidebar: React.FC = ({ children }) => {
  const { logoutUser } = useAuth();
  const toast = useExecuteToast();
  const navigate = useNavigate();
  const [activeNavItem, setActiveNavItem] = useState("");

  const navItems = [
    { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { title: "Your Dashboard", path: "/your-dashboard", icon: <MdDashboard /> },
    { title: "Ticket", path: "/ticket", icon: <BsTicketDetailed /> },
  ];

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavigation = (path: string, title: string) => {
    setActiveNavItem(title);
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f6f8" }}>
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <List sx={{ width: "100%" }}>
          {navItems.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                onClick={() => handleNavigation(item.path, item.title)}
                sx={{
                  padding: "10px 20px",
                  margin: "4px 0",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease-in-out",
                  backgroundColor:
                    item.title === activeNavItem ? "#e0e4ff" : "inherit",
                  color: item.title === activeNavItem ? "#3f51b5" : "inherit",
                  "&:hover": {
                    backgroundColor: "#f0f4ff",
                    color: "#3f51b5",
                  },
                }}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ width: "80%", margin: "16px 0" }} />
        <Button
          onClick={handleLogout}
          color="primary"
          variant="contained"
          sx={{
            margin: 2,
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 3 }}>{children}</Box>
    </Box>
  );
};

export default Sidebar;
