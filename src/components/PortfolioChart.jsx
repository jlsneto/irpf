import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PortfolioChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item['Código de Negociação']),
        datasets: [
            {
                label: 'Quantidade',
                data: data.map(item => item['Quantidade']),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default PortfolioChart;
