import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../Css/ChartPage.css';

// Registering the necessary components in ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartPage = () => {
  const [barFormData, setBarFormData] = useState({ fromDate: '', toDate: '' });
  const [barSalesData, setBarSalesData] = useState(null);
  const [barChartClicked, setBarChartClicked] = useState(false);
  const barChartRef = useRef(null);

  const handleBarChange = (e) => {
    setBarFormData({ ...barFormData, [e.target.name]: e.target.value });
  };

  const handleBarChart = async () => {
    try {
      const salesResponse = await axios.post('http://localhost:8082/api/product-sales', barFormData);
      setBarSalesData(salesResponse.data);
      setBarChartClicked(true);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const renderBarChart = () => {
    if (!barChartClicked) return null;
    if (!barFormData.fromDate || !barFormData.toDate) {
      return <p className="alert-message">Please select both From Date and To Date.</p>;
    }
    if (!barSalesData) {
      return <p className="alert-message">No Product is sold in this date range.</p>;
    }

    const categories = Object.keys(barSalesData);
    const counts = Object.values(barSalesData);

    if (categories.length === 0) {
      return <p className="alert-message">No Product is sold in this date range.</p>;
    }

    const data = {
      labels: categories,
      datasets: [
        {
          label: 'Number of Products Sold',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <p className="chart-description">This bar chart shows the number of products sold in each category within the selected date range.</p>
        <Bar style={{height: '200px', margin: '0 auto' }} ref={barChartRef} data={data} />
      </div>
    );
  };

  useEffect(() => {
    const barChart = barChartRef.current;
    return () => {
      if (barChart) {
        barChart.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-page-container">
      <h2 className="chart-page-heading">Bar Chart</h2>
      <div className="chart-form">
        <div className="form-group">
          <label>From Date</label>
          <input type="date" name="fromDate" value={barFormData.fromDate} onChange={handleBarChange} />
        </div>
        <div className="form-group">
          <label>To Date</label>
          <input type="date" name="toDate" value={barFormData.toDate} onChange={handleBarChange} />
        </div>
        <button onClick={handleBarChart} className="generate-chart-btn">Generate Bar Chart</button>
      </div>
      {renderBarChart()}
    </div>
  );
};

export default BarChartPage;
