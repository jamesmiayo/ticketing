import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface TicketPriorityProps{
  ticketPriority: any;
  isLoading: boolean;
}
export default function TicketPriority({ ticketPriority, isLoading }: TicketPriorityProps) {
  const [chartData, setChartData] = useState<any>(null);
  const getDataList = async () => {
    const labels = ticketPriority?.map((item: any) => item.priority_label);

    setChartData({
      labels,
      datasets: [
        {
          data: ticketPriority?.map((item: any) => item.value),
          backgroundColor: ticketPriority.map(
            (item: any) => item.priority_color
          ),
          hoverBackgroundColor: ticketPriority?.map(
            (item: string) => item.priority_color
          ),
        },
      ],
    });
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
