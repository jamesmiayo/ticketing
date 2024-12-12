import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import { MdDashboard } from "react-icons/md";
import { BsTicketDetailed } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"; // Import icons for toggle
import { useAuth } from "../../context/AuthContext";
import { useExecuteToast } from "../../context/ToastContext";
import { RiLogoutBoxFill } from "react-icons/ri";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider";
import { IoSettingsSharp } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { FaRegQuestionCircle } from "react-icons/fa";

// import { FaUser } from "react-icons/fa";

const Sidebar = ({ children }: any) => {
  const { permission } = useContext(PermissionContext);
  const navigate = useNavigate();
  const [activeNavItem, setActiveNavItem] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logoutUser } = useAuth();
  const toast = useExecuteToast();

  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard />,
      show: true,
    },
    {
      title: "Ticket",
      path: "/ticket?page=1",
      icon: <BsTicketDetailed />,
      show: true,
    },
    {
      title: "FAQ",
      path: "/faq",
      icon: <FaRegQuestionCircle />,
      show: true,
    },
    {
      title: "User Ticket",
      path: "/user-ticket",
      icon: <BsTicketDetailed />,
      show: permission?.includes("Can View User Ticket"),
    },
    // { title: "Profile", path: "/profile", icon: <FaUser />, show: true },
    {
      title: "Maintenance",
      path: "/maintenance",
      icon: <IoSettingsSharp />,
      show: permission?.includes("Can View Maintenance"),
    },
  ];

  const handleNavigation = (path: string, title: string) => {
    setActiveNavItem(title);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const response: any = await logoutUser();
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#deecf3",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          padding: 2,
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#103754",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            width: sidebarOpen ? "190px" : "90px",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "absolute",
              top: "60px",
              right: sidebarOpen ? "-20px" : "-10px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
              zIndex: 110,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <List
              sx={{
                width: "100%",
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              {navItems
                .filter((item) => item.show)
                .map((item, index) => (
                  <>
                    <Tooltip title={item.title} placement="right" arrow sx={{ fontSize: '100px' }}>
                      <ListItem
                        disablePadding
                        key={index}
                        sx={{ marginTop: 1 }}
                      >
                        <ListItemButton
                          onClick={() =>
                            handleNavigation(item.path, item.title)
                          }
                          sx={{
                            margin: 0,
                            transition:
                              "border-left 0.3s ease-in-out, background-color 0.3s ease-in-out",
                            borderLeft:
                              item.title === activeNavItem
                                ? "10px solid white"
                                : "10px solid transparent",
                            color: "white",
                            "&:hover": {
                              borderLeft: "10px solid white",
                              color: "white",
                            },
                            display: "flex",
                            justifyContent: sidebarOpen
                              ? "space-between"
                              : "center",
                            alignItems: "center",
                            padding: sidebarOpen ? "10px 16px" : "10px",
                          }}
                        >
                          {item.icon && (
                            <ListItemIcon
                              sx={{
                                color: "white",
                                minWidth: "auto",
                                marginRight: sidebarOpen ? "8px" : "0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                          )}
                          {sidebarOpen && <ListItemText primary={item.title} />}
                        </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  </>
                ))}
            </List>

            <Box sx={{ marginBottom: "16px", width: "100%" }}>
              <ListItem disablePadding sx={{ marginTop: 1 }}>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    margin: 0,
                    transition:
                      "border-left 0.3s ease-in-out, background-color 0.3s ease-in-out",
                    color: "white",
                    borderLeft: "10px solid transparent",
                    display: "flex",
                    justifyContent: sidebarOpen ? "space-between" : "center",
                    alignItems: "center",
                    padding: sidebarOpen ? "10px 16px" : "10px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: "auto",
                      marginRight: sidebarOpen ? "8px" : "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RiLogoutBoxFill />
                  </ListItemIcon>
                  {sidebarOpen && <ListItemText primary={"Logout"} />}
                </ListItemButton>
              </ListItem>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: 0,
          marginLeft: sidebarOpen ? "210px" : "100px",
          transition: "margin-left 0.3s ease-in-out",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
