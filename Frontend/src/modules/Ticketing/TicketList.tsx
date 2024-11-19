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

  const colors = [
    "#4CAF50",
    "#2196F3",
    "#FFC107",
    "#F44336",
    "#9C27B0",
    "#3F51B5",
    "#009688",
    "#FF5722",
  ];

  return (
    <Grid container spacing={3}>
      {loading ? (
        [...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StatCard
              title="Loading..."
              value={<CircularProgress size={20} />}
              backgroundColor={colors[index % colors.length]} // Assign color based on index
            />
          </Grid>
        ))
      ) : data && data.length > 0 ? (
        data.map((status, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StatCard
              title={status.label}
              value={status.value}
              backgroundColor={colors[index % colors.length]} // Assign color based on index
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            No data available
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

const StatCard: React.FC<{
  title: string;
  value: React.ReactNode;
  backgroundColor?: string;
}> = ({
  title,
  value,
  backgroundColor = "#d0e1e9", // Default color if no color is passed
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 150,
        background: backgroundColor, // Use the background color prop
        color: "white",
      }}
    >
      <Typography color="white" gutterBottom>
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
