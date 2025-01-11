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
          borderColor: "rgb(0, 139, 7)",
          backgroundColor: "green",
          tension: 0.4,
        },
        {
          label: "Failed",
          data: value?.failed_data,
          borderColor: "rgb(206, 88, 88)",
          backgroundColor: "red",
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
  