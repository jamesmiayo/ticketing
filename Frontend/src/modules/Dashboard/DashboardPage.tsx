import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { OverviewAPI } from "../../api/services/getOverview";
import TodaySummaryComponent from "./TodaySummaryComponent";
import BranchListTable from "./BranchListTable";
import CategoryTableList from "./CategoryTableList";
import TicketListTable from "./TicketListTable";
import TicketList from "../Ticketing/TicketList";
import TicketPriority from "./TicketPriority";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider";
import TicketTable from "../Ticketing/TicketTable";
import { useAuth } from "../../context/AuthContext";
import UpdateUserBranchSection from "../UsersProfile/UpdateUserBranchSection";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { permission } = useContext(PermissionContext);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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
  const handleNavigateTicket = () => {
    navigate("/ticket");
  };

  useEffect(() => {
    dashboardFetchData();
    if (user?.branch_id === null && user?.section_id === null) {
      setOpen(true);
    }
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
        <Dialog open={open} onClose={() => setOpen(false)}>
          {open && (
            <>
              <DialogTitle>
                You Need To Update Your Profile Before Creating Ticket.
              </DialogTitle>
              <DialogContent>
                <UpdateUserBranchSection onClose={() => setOpen(false)} />
              </DialogContent>
            </>
          )}
        </Dialog>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Dashboard
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TicketList
              ticketList={totalTicket?.total_ticket_count?.formatted_counts}
              isLoading={loading}
            />
            {permission?.includes("Can View Ticket Priority") && (
              <TicketPriority
                ticketPriority={totalTicket?.total_priority}
                isLoading={loading}
                ticketUnassigned={
                  totalTicket?.total_ticket_count?.unassigned_ticket
                }
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
              <>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "end", padding: 2 }}
                  >
                    <Button
                      onClick={handleNavigateTicket}
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: "none" }}
                    >
                      See More
                    </Button>
                  </Box>
                  <TicketTable
                    tickets={totalTicket?.latest_ticket}
                    isLoading={loading}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
