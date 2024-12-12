import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TicketPriority({ ticketPriority, isLoading }: any) {
  // Ticket priority data
  const data = {
    labels: ["Low", "Medium", "High", "Critical","Not Yet Priority"],
    datasets: [
      {
        data: ticketPriority,
        backgroundColor: ["#66BB6A", "#FF9800",  "#E53935", "#C62E2E",   "#608BC1"],
        hoverBackgroundColor: ["#66BB6A", "#FF9800",  "#E53935", "#C62E2E",   "#608BC1"],
      },
    ],
  };

  const options:any = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  return (
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
        {/* <Box sx={{                  borderRadius: 2,
               backgroundColor: "rgba(76, 175, 80, 0.1)" , paddingX: 6 , paddingY: 1.5 }}>
          <Typography
            variant="caption"
            gutterBottom
            sx={{
              mb: 2,
              fontWeight: "700",
              color: "text.primary",
              textAlign: "center",
            }}
          >
            Total Unassigned Ticket: {ticketUnassigned}
          </Typography>
        </Box> */}
      </Paper>
  );
}
