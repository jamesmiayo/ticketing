import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { ticketApi } from "../../api/services/ticket";
import { OverviewAPI } from "../../api/services/getOverview";
import TodaySummaryComponent from "./TodaySummaryComponent";
import BranchListTable from "./BranchListTable";
import CategoryTableList from "./CategoryTableList";
import TicketListTable from "./TicketListTable";
import TicketList from "../Ticketing/TicketList";
import TicketPriority from "./TicketPriority";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [totalTicket, setTotalTicket] = useState<any>([]);

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
          <Box sx={{ display: "flex", gap: 2 }}>
            <TicketList
              ticketList={totalTicket?.total_ticket_count}
              isLoading={loading}
            />
                        <TicketPriority ticketPriority={totalTicket?.total_priority} isLoading={loading}/>
            <TodaySummaryComponent totalTicket={totalTicket} isLoading={loading}/>
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
            <CategoryTableList data={totalTicket?.total_ticket_category} isLoading={loading} />
            <BranchListTable data={totalTicket?.total_ticket_branch} isLoading={loading} />
            <TicketListTable data={totalTicket?.latest_ticket} isLoading={loading} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
