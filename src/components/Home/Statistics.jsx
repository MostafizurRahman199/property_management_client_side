

import React, { useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';
import { usePropertyContext } from '../../Auth/StateContext';
import { useDarkMode } from '../../Auth/DarkModeContext';

const Statistics = () => {
    const { darkMode, setDarkMode } = useDarkMode();
  const { properties } = usePropertyContext();

  useEffect(() => {
    // Cleanup all chart instances on component unmount
    return () => {
      Object.values(ChartJS.instances).forEach((chartInstance) => {
        if (chartInstance) chartInstance.destroy();
      });
    };
  }, []);

  // Handle empty properties
  if (!properties || properties.length === 0) {
    return <div className="p-4">Loading property statistics...</div>;
  }

  // Pie Chart Data (Property Types)
  const typeData = properties.reduce((acc, property) => {
    acc[property.type] = (acc[property.type] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(typeData),
    datasets: [
      {
        data: Object.values(typeData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Data (Property Statuses)
  const statusData = properties.reduce((acc, property) => {
    acc[property.status] = (acc[property.status] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(statusData),
    datasets: [
      {
          label: 'Pending',
          data: Object.values(statusData),
        backgroundColor: ["#ffce56", '#36A2EB', '#5aa35d', '#FF6384'  ],
        borderColor: ["#ffce56", '#36A2EB', '#5aa35d', '#FF6384'],
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data (Property Prices Over Time)
  const sortedProperties = [...properties].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const lineChartData = {
    labels: sortedProperties.map((property) => property.date),
    datasets: [
      {
        label: 'Property Prices',
        data: sortedProperties.map((property) => property.price),
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.4,
      },
    ],
  };

  // Chart options to control sizing and responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height/width
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="md:p-4 my-10">
      <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${darkMode == true ?  "text-white" : "text-purple-500"}`}>Property Statistics</h2>

      {/* Horizontal Scrollable Flex Container */}
      <div className="flex flex-col gap-8 md:flex-row justify-start space-y-6 md:space-y-0 md:space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
  {/* Pie Chart */}
  <div className="flex-shrink-0 snap-start min-w-[300px] md:w-[400px] h-[300px]">
    <h3 className={`text-lg font-semibold mb-2 text-center ` }>Property Types</h3>
    
    <Pie data={pieChartData} options={chartOptions} />
  </div>

  {/* Bar Chart */}
  <div className="flex-shrink-0 snap-start min-w-[300px] md:w-[400px] h-[300px]">
    <h3 className="text-lg font-semibold mb-2 text-center">Property Statuses</h3>
    <Bar data={barChartData} options={chartOptions} />
  </div>

  {/* Line Chart */}
  <div className="flex-shrink-0 snap-start min-w-[300px] md:w-[400px] h-[300px]">
    <h3 className="text-lg font-semibold mb-2 text-center">Property Prices</h3>
    <Line data={lineChartData} options={chartOptions} />
  </div>
</div>


      
    </div>
  );
};

export default Statistics;

