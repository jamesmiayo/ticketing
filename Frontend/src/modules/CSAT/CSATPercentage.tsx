import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";

export default function CSATPercentage({ data, isPassed }: any) {
  const percentage = Math.min(Math.max(data, 0), 100);

  const mainColor = isPassed ? "#4caf50" : "#f44336";

  const chartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [mainColor, "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box
      sx={{
        height: "300px",
        backgroundColor: "white",
        padding: 2,
        borderRadius: 2,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "rgba(31, 80, 154 , 1)",
        }}
      >
        Average Satisfactory
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: 2
        }}
      >
        <Doughnut data={chartData} options={options} />

        <Typography
          variant="h5"
          component="div"
          sx={{
            position: "absolute",
            fontWeight: "bold",
            color: mainColor,
          }}
        >
          {percentage}%
        </Typography>
      </Box>
    </Box>
  );
}
