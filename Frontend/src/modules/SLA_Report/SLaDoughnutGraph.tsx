import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, CircularProgress } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SLaDoughnutGraph({ rowData, isLoading }: any) {
  const data = {
    labels: ["Passed", "Failed"],
    datasets: [
      {
        label: "Tasks",
        data: [rowData?.sla_pass_percentage, rowData?.sla_fail_percentage],
        backgroundColor: ["rgba(76, 175, 80, 0.3)", "rgba(175, 76, 76, 0.3)"],
        borderColor: ["rgba(76, 175, 80, 1)", "rgb(175, 76, 76, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isLoading ? <Doughnut data={data} options={options} /> : <CircularProgress />}
    </Box>
  );
}
