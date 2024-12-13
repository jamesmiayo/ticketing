import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../context/AuthContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Chip,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

const NavBar: React.FC = () => {
  const { user } = useAuth();
  const [showDiv, setShowDiv] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notification } = useAuth();

  const handleClick = () => {
    setShowDiv((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDiv(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(notification);
  return (
    <Box
      sx={{
        padding: 1,
        position: "fixed",
        right: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box>
            <Box
              sx={{
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: 1,
              }}
            >
              <Badge
                badgeContent={notification?.total_unread_ticket}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <NotificationsIcon
                  onClick={handleClick}
                  sx={{
                    color: "#103754",
                    cursor: "pointer",
                    width: 35,
                    height: 35,
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                />
              </Badge>
            </Box>

            {showDiv && (
              <Box
                ref={dropdownRef}
                sx={{
                  position: "absolute",
                  top: "60px",
                  right: "80px",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                  padding: "16px",
                  width: 500,
                  maxHeight: "300px",
                  overflowY: "auto",
                  zIndex: 1200,
                }}
              >
                {notification?.data?.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No Notification Created.
                  </Typography>
                )}
                {notification?.data?.map((row: any) => {
                  return (
                    <Paper
                      elevation={2}
                      component={Link}
                      onClick={() => setShowDiv(false)}
                      to={`/ticket-information?id=${row?.ticket_hdr?.ticket_id}`}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 1,
                        mb: 1,
                        borderRadius: 2,
                        cursor: "pointer",
                        color: row?.is_read ? "black" : "text.secondary",
                        backgroundColor: row?.is_read
                          ? "white"
                          : "rgba(31, 80, 154 , 0.2)",
                        "&:hover": {
                          opacity: 0.8,
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        mb={1}
                      >
                        <Tooltip title={`Assigned By: ${row?.from_user?.name}`}>
                          <Avatar
                            src={row?.from_user?.profile_picture}
                            sx={{
                              cursor: "pointer",
                              width: 40,
                              height: 40,
                              marginLeft: 2,
                              "&:hover": {
                                opacity: 0.8,
                              },
                            }}
                          />
                        </Tooltip>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "400px"
                            }}
                          >
                            {row?.ticket_hdr?.title}
                          </Typography>
                          <Chip
                            label={
                              row?.ticket_hdr?.ticket_logs_latest?.ticket_status
                            }
                            color="primary"
                            size="small"
                          />
                          <Typography variant="body2" color="text.secondary">
                            Created On: {row?.created_at}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  );
                })}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: 1,
            }}
          >
            <Avatar
              src={user?.profile_picture}
              sx={{
                backgroundColor: "#103754",
                cursor: "pointer",
                width: 35,
                height: 35,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              component={Link}
              to="/profile"
            />
          </Box>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default NavBar;
