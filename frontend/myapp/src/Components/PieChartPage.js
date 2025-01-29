import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import '../Css/ChartPage.css';

// Registering the necessary components in ChartJS
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChartPage = () => {
  const [pieFormData, setPieFormData] = useState({ fromDate: '', toDate: '' });
  const [pieProfitData, setPieProfitData] = useState(null);
  const [pieChartClicked, setPieChartClicked] = useState(false);
  const pieChartRef = useRef(null);

  const handlePieChange = (e) => {
    setPieFormData({ ...pieFormData, [e.target.name]: e.target.value });
  };

  const handlePieChart = async () => {
    try {
      const profitResponse = await axios.post('http://localhost:8082/api/profit-percentage', pieFormData);
      setPieProfitData(profitResponse.data);
      setPieChartClicked(true);
    } catch (error) {
      console.error('Error fetching profit data:', error);
    }
  };

  const renderPieChart = () => {
    if (!pieChartClicked) return null;
    if (!pieFormData.fromDate || !pieFormData.toDate) {
      return <p className="alert-message">Please select both From Date and To Date.</p>;
    }
    if (!pieProfitData) {
      return <p className="alert-message">No Product is sold in this date range.</p>;
    }

    const categories = Object.keys(pieProfitData);
    const avgProfits = Object.values(pieProfitData);

    if (categories.length === 0) {
      return <p className="alert-message">No Product is sold in this date range.</p>;
    }

    const data = {
      labels: categories,
      datasets: [
        {
          label: 'Average Profit Percentage',
          data: avgProfits,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ]
        },
      ],
    };

    return (
      <div>
        <p className="chart-description">This pie chart displays the average profit percentage for each category within the selected date range.</p>
        <Pie style={{height: '220px', margin: '0 auto' }} ref={pieChartRef} data={data} />
      </div>
    );
  };

  useEffect(() => {
    const pieChart = pieChartRef.current;
    return () => {
      if (pieChart) {
        pieChart.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-page-container">
      <h2 className="chart-page-heading">Pie Chart</h2>
      <div className="chart-form">
        <div className="form-group">
          <label>From Date</label>
          <input type="date" name="fromDate" value={pieFormData.fromDate} onChange={handlePieChange} />
        </div>
        <div className="form-group">
          <label>To Date</label>
          <input type="date" name="toDate" value={pieFormData.toDate} onChange={handlePieChange} />
        </div>
        <button onClick={handlePieChart} className="generate-chart-btn">Generate Pie Chart</button>
      </div>
      {renderPieChart()}
    </div>
  );
};

export default PieChartPage;