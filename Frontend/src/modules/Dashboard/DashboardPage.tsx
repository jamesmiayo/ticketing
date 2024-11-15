import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TicketList from "../Ticketing/TicketList";
import TicketTable from "../Ticketing/TicketTable";
import { ticketApi } from "../../api/services/ticket";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC<any> = () => {
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
    <Box display="flex">
      <Box flex={1}>
        <Box p={3}>
          <h1>Dashboard</h1>
          <TicketList />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
          ></Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              View More
            </Button>
          </Box>
          <TicketTable tickets={data} isLoading={loading} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
