import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CapitalGainsChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item['Código de Negociação']),
        datasets: [
            {
                label: 'Ganho de Capital',
                data: data.map(item => item['Ganho de Capital']),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default CapitalGainsChart;
