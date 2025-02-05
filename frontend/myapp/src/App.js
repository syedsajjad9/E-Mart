import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.js';
import Laptops from './Components/Laptops.js';
import Mobiles from './Components/Mobiles.js';
import Headsets from './Components/Headsets.js';
import SmartWatches from './Components/SmartWatches.js';
import Reports from './Components/Reports';
import BarChartPage from './Components/BarChartPage.js';
import PieChartPage from './Components/PieChartPage';
import AddNew from './Components/AddNew.js';
import Checkout from './Components/Checkout.js'; 
import Home from './Components/Home.js'; 
import Footer from './Components/Footer.js';

const App = () => {
    return (
        <Router>
            <div className="App" style={{ backgroundColor: "#f5f5f5" }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/laptops" element={<Laptops />} />
                    <Route path="/laptops/checkout/:id" element={<Checkout category="laptops" />} />
                    <Route path="/mobiles" element={<Mobiles />} />
                    <Route path="/mobiles/checkout/:id" element={<Checkout category="mobiles" />} />
                    <Route path="/headsets" element={<Headsets />} />
                    <Route path="/headsets/checkout/:id" element={<Checkout category="headsets" />} />
                    <Route path="/smartwatches" element={<SmartWatches />} />
                    <Route path="/smartwatches/checkout/:id" element={<Checkout category="smartwatches" />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/bar-chart" element={<BarChartPage/>} />
                <Route path="/pie-chart" element={<PieChartPage/>} />
                    <Route path="/add-new" element={<AddNew />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;
