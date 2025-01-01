import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './DataVisualization.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DataVisualization({ customers }) {
  const usageData = customers.reduce((acc, customer) => {
    acc[customer.usage] = (acc[customer.usage] || 0) + 1;
    return acc;
  }, {});

  const satisfactionData = customers.reduce((acc, customer) => {
    acc[customer.satisfaction] = (acc[customer.satisfaction] || 0) + 1;
    return acc;
  }, {});

  const usageChartData = {
    labels: Object.keys(usageData),
    datasets: [
      {
        label: 'Customer Usage',
        data: Object.values(usageData),
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  const satisfactionChartData = {
    labels: Object.keys(satisfactionData),
    datasets: [
      {
        label: 'Customer Satisfaction',
        data: Object.values(satisfactionData),
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  return (
    
      <h2>Data Visualization</h2>
      
        
          <h3>Customer Usage</h3>
          <Bar data={usageChartData} options={{...chartOptions, title: { display: true, text: 'Customer Usage' }}} />
        
        
          <h3>Customer Satisfaction</h3>
          <Bar data={satisfactionChartData} options={{...chartOptions, title: { display: true, text: 'Customer Satisfaction' }}} />
        
      
    
  );
}

export default DataVisualization;
