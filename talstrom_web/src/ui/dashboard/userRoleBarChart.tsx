import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserRoleBarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const UserRoleBarChart: React.FC<UserRoleBarChartProps> = ({ data }) => {
  const roleCounts = data.datasets[0].data.reduce((acc, count, index) => {
    const role = data.labels[index];
    acc[role] = count;
    return acc;
  }, {} as Record<string, number>);

  // Generating dynamic title text
  const titleText = `Users by Role - ${Object.entries(roleCounts)
    .map(([role, count]) => `${count} ${role}`)
    .join(" | ")}`;

  const options = {
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) =>
            typeof value === "number" ? value.toString() : value,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: titleText,
        position: "bottom" as "bottom",
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default UserRoleBarChart;
