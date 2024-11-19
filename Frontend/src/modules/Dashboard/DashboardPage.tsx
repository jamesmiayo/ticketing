import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { ticketApi } from "../../api/services/ticket";
import TicketList from "../Ticketing/TicketList";
import TicketTable from "../Ticketing/TicketTable";
import { OverviewAPI } from "../../api/services/getOverview";
import TodaySummaryComponent from "./TodaySummaryComponent";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalTicket, setTotalTicket] = useState<any>([]);
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

  const handleOpen = () => {
    navigate("/ticket");
  };

  const dashboardFetchData = async () => {
    try {
      setLoading(true);
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
          <Box sx={{ display: "flex", gap: 5 }}>
            <TicketList
              ticketList={totalTicket?.total_ticket_count}
              isLoading={loading}
            />
            <TodaySummaryComponent totalTicket={totalTicket} />
          </Box>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              overflow: "hidden",
              justifyContent: "space-between",
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 3,
                background: "white",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                flex: 1,
                minWidth: "30%",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Table 1</Typography>
                  <Button
                    onClick={handleOpen}
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    View More
                  </Button>
                </Box>
                <TicketTable tickets={data} isLoading={loading} />
              </Box>
            </Paper>

            <Paper
              elevation={4}
              sx={{
                p: 3,
                background: "white",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                flex: 1,
                minWidth: "30%",
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Table 2
                </Typography>
                <TicketTable tickets={data} isLoading={loading} />
              </Box>
            </Paper>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                background: "white",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                flex: 1,
                minWidth: "35%",
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Table 3
                </Typography>
                <TicketTable tickets={data} isLoading={loading} />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
