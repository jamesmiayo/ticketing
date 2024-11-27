import React from "react";
import {  CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { cardColors } from "../../constants/constants";

// Define the structure of each ticket status item
interface TicketStatus {
  label: string;
  value: number;
}

interface TicketListProps {
  ticketList?: TicketStatus[]; // Optional array
  isLoading: boolean;
}

const TicketList: React.FC<TicketListProps> = ({
  ticketList = [],
  isLoading,
}) => {
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
      {isLoading
        ? [...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StatCard
                title="Loading..."
                value={<CircularProgress size={20} />}
                backgroundColor={colors[index % colors.length]}
              />
            </Grid>
          ))
        : ticketList.map((status, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StatCard
                title={status.label}
                value={status.value}
                backgroundColor={colors[index % colors.length]}
              />
            </Grid>
          ))}
    </Grid>
  );
};

const StatCard: React.FC<{
  title: string;
  value: React.ReactNode;
  backgroundColor?: string;
}> = ({ title, value, backgroundColor = "#d0e1e9" }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 150,
        background: backgroundColor,
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
