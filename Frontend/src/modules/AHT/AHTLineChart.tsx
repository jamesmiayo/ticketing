import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import { AHTChartOptions } from "../../interface";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AHTLineChart() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Average Handling Time (AHT)",
        data: [12, 19, 3, 5, 2, 3], // Y-axis data points
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options:AHTChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "AHT Line Chart",
      },
    },
  };

  return (
    <Box style={{ width: "100%", height: "100%" , borderRadius: 2}}>
    <Line
      data={data}
      options={{
        ...options,
        maintainAspectRatio: false,
      }}
    />
  </Box>
  );
}
