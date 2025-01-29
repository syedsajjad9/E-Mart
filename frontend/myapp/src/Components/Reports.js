// src/components/Reports.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Reports.css';

const Reports = () => {
    return (
        <div className="reports-container">
            <h2 className="reports-heading">Reports</h2>
            <div className="reports-description">
                <p>Welcome to the reports section. Here you can view detailed information in the form of bar and pie charts. Use the buttons below to navigate to the respective charts.</p>
            </div>
            <div className="reports-content">
                <div className="reports-chart-description">
                    <h3 className="reports-chart-heading">Bar Chart</h3>
                    <p className="chart-description">
                        The bar chart provides a visual comparison between different categories. It is useful for displaying the differences in size, quantity, or frequency across different groups.
                    </p>
                    <Link to="/bar-chart" className="reports-btn btn btn-primary">
                        View Bar Chart
                    </Link>
                </div>
                <div className="reports-chart-description">
                    <h3 className="reports-chart-heading">Pie Chart</h3>
                    <p className="chart-description">
                        The pie chart represents data as slices of a circle, showing the proportion of each category to the whole. It is ideal for displaying percentage or proportional data.
                    </p>
                    <Link to="/pie-chart" className="reports-btn btn btn-primary">
                        View Pie Chart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Reports;
