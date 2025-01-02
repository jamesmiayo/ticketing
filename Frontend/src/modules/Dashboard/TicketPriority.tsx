import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { SLA } from "../../api/services/SLA";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TicketPriority({ ticketPriority, isLoading }: any) {
  const [chartData, setChartData] = useState<any>(null);

  const getDataList = async () => {
    try {
      const response = await SLA.getSLA();

      const labels = response.map((row: any) => row.priority_label);
      labels.push("Not Yet Priority");

      const data = labels.map((label: string) => {
        return ticketPriority?.[label] !== undefined
          ? ticketPriority[label]
          : 0;
      });

      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "#66BB6A",
              "#FF9800",
              "#E53935",
              "#C62E2E",
              "#608BC1",
            ],
            hoverBackgroundColor: [
              "#66BB6A",
              "#FF9800",
              "#E53935",
              "#C62E2E",
              "#608BC1",
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching SLA data:", error);
    }
  };

  useEffect(() => {
    getDataList();
  }, [ticketPriority]);

  const options: any = {
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
        {isLoading || !chartData ? (
          <CircularProgress />
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </Box>
    </Paper>
  );
}
