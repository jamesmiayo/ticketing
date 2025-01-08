import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CSATBarGraph({data}:any) {
    const labels = data?.map((item:any) => item.name); 
    const values = data?.map((item:any) => item.value); 

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Satisfactory Ratings',
                data: values,
                backgroundColor: 'rgba(31, 80, 154 , 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options:any = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Satisfactory Ratings Bar Chart',
            },
        },
    };
  return (
    <Bar
      data={chartData}
      options={{
        ...options,
        maintainAspectRatio: false, 
      }}
    />
  )
}
