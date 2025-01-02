import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AHTTicketTable from "./AHTTicketTable";
import { AHT } from "../../api/services/aht";

export default function AHTPage() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams(); 

  const fetchUserTickets = async () => {
    setLoading(true);
    try {
        const response = await AHT.getAHT();
      setData(response);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTickets();
  }, []);

  const userId = searchParams.get("user_id");

  return (
    <>
      <Box
        component="main"
        sx={{
          p: 3,
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Ticket Handle Time
        </Typography>
        {userId ? (
          <AHTTicketTable />
        ) : (
          <AHTTicketTable data={data?.data} isLoading={loading} />
        )}
      </Box>
    </>
  );
}
