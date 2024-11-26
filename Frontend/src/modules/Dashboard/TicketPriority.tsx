import React from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TicketPriority({ ticketPriority, isLoading }: any) {
  // Ticket priority data
  const data = {
    labels: ["Low", "Medium", "High", "Critical","Not Assign Yet"],
    datasets: [
      {
        data: ticketPriority,
        backgroundColor: ["#4caf50", "#ff9800",  "red", "darkred",   "blue"],
        hoverBackgroundColor: ["#3e8e41","#e68a00",  "red",  "#a10000",  "blue"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        width: "100%",
        mb: 4,
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          background: "white",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          height: 340,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: "600",
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Ticket Priority Summary
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Pie data={data} options={options} />
          )}
        </Box>
      </Paper>
    </Box>
  );
}
