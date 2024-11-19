"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ticketApi } from "../../api/services/ticket";
import TicketList from "../Ticketing/TicketList";
import TicketTable from "../Ticketing/TicketTable";
import { useNavigate } from "react-router-dom";
import { OverviewAPI } from "../../api/services/getOverview";
import TodaySummaryComponent from "./TodaySummaryComponent";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalTicket, setTotalTicket] = useState<any>([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await ticketApi.getTicketData();
      console.log(result);
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

  const dashboardFetchData = async () => {
    setLoading(true);
    try {
      const result = await OverviewAPI.getAllData();
      if (result) {
        setTotalTicket(result);
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
    dashboardFetchData();
    fetchData();
  }, []);

  const handleOpen = () => {
    navigate("/ticket");
  };

  return (
    <Box style={{ padding: 5 }}>
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
              <TicketList
                ticketList={totalTicket?.total_ticket_count}
                isLoading={loading}
              />
              <TodaySummaryComponent totalTicket={totalTicket} />
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
