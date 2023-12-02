// Import necessary libraries
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

// Dummy data (replace with your actual data)
import salesData from './data.js';

// Function to filter data by year and month
const filterData = (data, year, month) => {
  // Implement your filtering logic based on the provided year and month
  // For example, if your data has a date field, you can filter based on that
  return data[year] ? data[year][month] || [] : [];
};

// Main component
const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState('jan'); // Default to January

  useEffect(() => {
    // Filter data based on selected year and month
    const data = filterData(salesData, selectedYear, selectedMonth);
    setFilteredData(data);
  }, [selectedYear, selectedMonth]);

  // Prepare data for charts
  const chartOptions = {
    labels: filteredData.map(item => item.category),
    dataLabels: {
      enabled: true,
    },
  };

  const pieChartData = {
    series: filteredData.map(item => item.sales),
    options: {
      ...chartOptions,
      chart: {
        type: 'pie',
      },
    },
  };

  const barChartData = {
    series: [
      {
        name: 'Sales',
        data: filteredData.map(item => item.sales),
      },
    ],
    options: {
      ...chartOptions,
      chart: {
        type: 'bar',
      },
    },
  };

  // Function to handle year change
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  // Function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="year">Select Year:</label>

        <select  id="year" value={selectedYear} onChange={handleYearChange}>
          {Object.keys(salesData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="month">Select Month:</label>
        
        <select id="month"  value={selectedMonth} onChange={handleMonthChange}>
          {Object.keys(salesData[selectedYear]).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

      </div>

      <h2>Pie Chart for {selectedYear}-{selectedMonth}</h2>
      <Chart options={pieChartData.options} series={pieChartData.series} type="pie" height={300} />

      <h2>Bar Chart for {selectedYear}-{selectedMonth}</h2>
      <Chart options={barChartData.options} series={barChartData.series} type="bar" height={300} />
    </div>
  );
};

export default App;
