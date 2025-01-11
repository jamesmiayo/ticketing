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
        backgroundColor: ["green", "red"],
        borderColor: ["rgb(0, 139, 7)", "rgb(116, 0, 0)"],
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
