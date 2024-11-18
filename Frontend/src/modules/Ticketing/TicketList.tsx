import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { OverviewAPI } from "../../api/services/getOverview";

// Define the structure of each ticket status item
interface TicketStatus {
  label: string;
  value: number;
}

const TicketList: React.FC = () => {
  const [data, setData] = useState<TicketStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await OverviewAPI.getAllData();
      if (result && Array.isArray(result.total_ticket_count)) {
        setData(result.total_ticket_count);
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

  return (
    <Grid container spacing={3}>
      {loading ? (
        [...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              title="Loading..."
              value={<CircularProgress size={20} />}
            />
          </Grid>
        ))
      ) : data && data.length > 0 ? (
        data.map((status, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard title={status.label} value={status.value} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body1">No data available</Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
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
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default TicketList;
