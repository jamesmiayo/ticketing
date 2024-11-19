"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ConfirmationNumber as TicketIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  OpenInNew as OpenInNewIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";
import { ticketApi } from "../../api/services/ticket";
import TicketList from "../Ticketing/TicketList";
import TicketTable from "../Ticketing/TicketTable";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await ticketApi.getTicketData();
      if (result) {
        const formattedTickets = result.map((ticket: any) => ({
          id: ticket.id,
          ticket_id: ticket.ticket_id || "N/A",
          requestedBy: ticket.user?.name || "N/A",
          title: ticket.title || "N/A",
          category:
            ticket.sub_category?.category?.category_description || "N/A",
          subCategory: ticket.sub_category?.subcategory_description || "N/A",
          status: ticket?.ticket_logs_latest?.ticket_status || "Unknown",
          created_at: ticket?.ticket_logs_latest?.created_at,
          assignee: ticket?.ticket_logs_latest?.assignee?.name || "No assignee",
          updated_by:
            ticket?.ticket_logs_latest?.updated_by?.name || "No assignee",
        }));
        setData(formattedTickets);
      } else {
        console.warn("Unexpected data structure:", result);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    navigate("/ticket");
  };

  return (
    <Box>
      <Box
        component="main"
        sx={{
          p: 3,
          minHeight: "100vh",
          gap: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Dashboard
        </Typography>

        <Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: 5,
              }}
            >
              <TicketList />
              <Box sx={{ maxWidth: 400, width: "100%", mb: 4, height: "auto" }}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    background: "#deecf3",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    height: "340px",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      mb: 2,
                      fontWeight: "600",
                      color: "text.primary",
                      textAlign: "center",
                    }}
                  >
                    Today's Issue Summary
                  </Typography>
                  <List
                    sx={{
                      display: "flex",
                      padding: 0,
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 1,
                        backgroundColor: "rgba(63, 81, 181, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                          <OpenInNewIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Open"
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: {
                              color: "text.secondary",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        {10}
                      </Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 1,
                        backgroundColor: "rgba(76, 175, 80, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Solved"
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: {
                              color: "text.secondary",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        {10}
                      </Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 1,
                        backgroundColor: "rgba(156, 39, 176, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                          <AddCircleOutlineIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Created"
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: {
                              color: "text.secondary",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        {10}
                      </Typography>
                    </ListItem>
                  </List>
                </Paper>
              </Box>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 4,
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  View More
                </Button>
              </Box>
              <TicketTable tickets={data} isLoading={loading} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
