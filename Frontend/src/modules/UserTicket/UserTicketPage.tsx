import { useEffect, useState } from "react";
import { User } from "../../api/services/user";
import UserTicketTable from "./UserTicketTable";
import { Box, Typography } from "@mui/material";

export default function UserTicketPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserTickets = async () => {
    setLoading(true);
    try {
      const response = await User.getUserTicket();
      const data = response.map((row: any) => ({
        id: row.id,
        emp_id: row.emp_id,
        name: row.name,
        email: row.email,
        section: row?.section?.section_description,
        department: row?.section?.department?.department_description,
        total_ticket: row?.ticketdtl?.length || 0,
        satisfactory_percentage: row?.satisfactoryPercentage || 0,
        ticket_dtl: row?.ticketdtl || [],
      }));
      setData(data);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTickets();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          p: 3,
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          User Ticket List
        </Typography>
        <UserTicketTable data={data} isLoading={loading}/>
      </Box>
    </Box>
  );
}
