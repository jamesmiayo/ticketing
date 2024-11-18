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
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ConfirmationNumber as TicketIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
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
    navigate(`/ticket`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Dashboard
        </Typography>
        <TicketList />
        <Paper sx={{ mt: 4, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              View More
            </Button>
          </Box>
          <TicketTable tickets={data} isLoading={loading} />
        </Paper>
      </Box>
    </Box>
  );
};

const StatCard: React.FC<{ title: string; value: React.ReactNode }> = ({
  title,
  value,
}) => {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default Dashboard;
