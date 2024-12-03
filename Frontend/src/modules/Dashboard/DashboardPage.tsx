import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { OverviewAPI } from "../../api/services/getOverview";
import TodaySummaryComponent from "./TodaySummaryComponent";
import BranchListTable from "./BranchListTable";
import CategoryTableList from "./CategoryTableList";
import TicketListTable from "./TicketListTable";
import TicketList from "../Ticketing/TicketList";
import TicketPriority from "./TicketPriority";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider";
import TicketTable from "../Ticketing/TicketTable";

const Dashboard: React.FC = () => {
  const { permission } = useContext(PermissionContext);
  const [loading, setLoading] = useState(true);
  const [totalTicket, setTotalTicket] = useState<any>([]);
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
            {permission?.includes("Can View Ticket Priority") && (
              <TicketPriority
                ticketPriority={totalTicket?.total_priority}
                isLoading={loading}
              />
            )}
            {permission?.includes("Can View Today Summary") && (
              <TodaySummaryComponent
                totalTicket={totalTicket}
                isLoading={loading}
              />
            )}
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
            {permission?.includes("Can View Category Table List") && (
              <CategoryTableList
                data={totalTicket?.total_ticket_category}
                isLoading={loading}
              />
            )}
            {permission?.includes("Can View Branch Table List") && (
              <BranchListTable
                data={totalTicket?.total_ticket_branch}
                isLoading={loading}
              />
            )}{" "}
            {permission?.includes("Can View Ticket Table List") && (
              <TicketListTable
                data={totalTicket?.latest_ticket}
                isLoading={loading}
              />
            )}
            {[
              "Can View Category Table List",
              "Can View Branch Table List",
              "Can View Ticket Table List",
            ].some((perm) => !permission?.includes(perm)) && (
              <TicketTable
                tickets={totalTicket?.latest_ticket}
                isLoading={loading}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
