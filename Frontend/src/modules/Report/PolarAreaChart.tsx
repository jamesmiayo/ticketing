import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Box } from '@mui/material';

// Register Chart.js components
ChartJS.register(RadialLinearScale, Tooltip, Legend, Title);

const PolarAreaChart = ({value}:any) => {
  const data = {
    labels: ['Average Handle Time' , 'Customer Satisfaction' , 'Service Level Agreement'],
    datasets: [
      {
        label: 'My Dataset',
        data: [value?.aht?.aht_pass_percentage, value?.csat?.csat_w_pass_percentage, value?.sla?.sla_pass_percentage],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const, // TypeScript requires `as const` for position value
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      title: {
        display: true,
        text: 'Ticket Overview Reports',
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <Box sx={{ width: '65%' }}>
      <PolarArea data={data} options={options} />
    </Box>
  );
};

export default PolarAreaChart;
