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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export default function SLALineGraph({ value }: any) {
    const data = {
      labels: value?.labels,
      datasets: [
        {
          label: "Passed",
          data: value?.passed_data,
          borderColor: "rgba(76, 175, 80, 1)",
          backgroundColor: "rgba(76, 175, 80, 0.3)",
          tension: 0.4,
        },
        {
          label: "Failed",
          data: value?.failed_data,
          borderColor: "rgba(175, 76, 76, 0.3)",
          backgroundColor: "rgba(175, 76, 76, 1)",
          tension: 0.4,
        },
      ],
    };
  
    const options: any = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Service Level Agreement Chart",
        },
      },
    };
  
    return (
      <Line
        data={data}
        options={{
          ...options,
          maintainAspectRatio: false,
        }}
      />
    );
  }
  