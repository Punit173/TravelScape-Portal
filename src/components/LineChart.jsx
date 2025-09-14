import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ title, data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFD700',
        },
      },
      title: {
        display: true,
        text: title,
        color: '#FFD700',
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 215, 0, 0.1)',
        },
        ticks: {
          color: '#FFD700',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 215, 0, 0.1)',
        },
        ticks: {
          color: '#FFD700',
        },
      },
    },
  };

  return (
    <div className="h-[400px] w-full rounded-lg bg-secondary p-4 shadow-lg">
      <Line options={options} data={data} />
    </div>
  );
}