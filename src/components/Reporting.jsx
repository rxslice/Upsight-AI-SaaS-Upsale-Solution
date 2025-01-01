import React, { useState, useEffect } from 'react';
import { fetchCustomerData } from '../utils/data';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Reporting.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reporting() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCustomerData();
        setCustomers(data.customers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const generateReport = () => {
    if (!customers || customers.length === 0) {
      setReportData(null);
      return;
    }

    const totalCustomers = customers.length;
    const planCounts = customers.reduce((acc, customer) => {
      acc[customer.plan] = (acc[customer.plan] || 0) + 1;
      return acc;
    }, {});
    const lifecycleCounts = customers.reduce((acc, customer) => {
      acc[customer.lifecycleStage] = (acc[customer.lifecycleStage] || 0) + 1;
      return acc;
    }, {});
    const segmentCounts = customers.reduce((acc, customer) => {
      acc[customer.segment] = (acc[customer.segment] || 0) + 1;
      return acc;
    }, {});

    const planChartData = {
      labels: Object.keys(planCounts),
      datasets: [
        {
          label: 'Customers by Plan',
          data: Object.values(planCounts),
          backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        },
      ],
    };

    const lifecycleChartData = {
      labels: Object.keys(lifecycleCounts),
      datasets: [
        {
          label: 'Customers by Lifecycle Stage',
          data: Object.values(lifecycleCounts),
          backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        },
      ],
    };

    const segmentChartData = {
      labels: Object.keys(segmentCounts),
      datasets: [
        {
          label: 'Customers by Segment',
          data: Object.values(segmentCounts),
          backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196F3', '#9C27B0', '#795548', '#607D8B', '#00BCD4'],
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

    const report = {
      totalCustomers,
      planChartData,
      lifecycleChartData,
      segmentChartData,
      chartOptions,
    };
    setReportData(report);
  };

  return (
    
      <h2>Reporting</h2>
      {loading && <p>Loading customer data...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        
          <button onClick={generateReport}>Generate Report</button>
          {reportData && (
            
              <h3>Report Summary</h3>
              <p><strong>Total Customers:</strong> {reportData.totalCustomers}</p>
              
                
                  <h3>Customers by Plan</h3>
                  <Bar data={reportData.planChartData} options={{...reportData.chartOptions, title: { display: true, text: 'Customers by Plan' }}} />
                
                
                  <h3>Customers by Lifecycle Stage</h3>
                  <Bar data={reportData.lifecycleChartData} options={{...reportData.chartOptions, title: { display: true, text: 'Customers by Lifecycle Stage' }}} />
                
                
                  <h3>Customers by Segment</h3>
                  <Bar data={reportData.segmentChartData} options={{...reportData.chartOptions, title: { display: true, text: 'Customers by Segment' }}} />
                
              
            
          )}
        
      )}
    
  );
}

export default Reporting;
