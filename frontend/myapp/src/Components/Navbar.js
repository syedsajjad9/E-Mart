import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link className="navbar-brand" style={{ color: '#ece6e6' }} to="/">E-Mart</Link>
                <button className="navbar-toggler" style={{ backgroundColor: 'white' }} type="button" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/laptops" onClick={toggleNav}>Laptops</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mobiles" onClick={toggleNav}>Mobiles</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/headsets" onClick={toggleNav}>Headsets</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/smartwatches" onClick={toggleNav}>Smart Watches</Link>
                        </li>
                        <li className="nav-item dropdown" ref={dropdownRef}>
                            <Link 
                                className="nav-link dropdown-toggle" 
                                to="/reports" 
                                
                                id="reportsDropdown" 
                                role="button" 
                                onClick={toggleDropdown} 
                                aria-haspopup="true" 
                                aria-expanded={isDropdownOpen}
                               
                            >
                                Reports
                            </Link>
                            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="reportsDropdown">
                                <Link className="dropdown-item" to="/bar-chart" onClick={toggleNav}>Bar Chart</Link>
                                <Link className="dropdown-item" to="/pie-chart" onClick={toggleNav}>Pie Chart</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-new" onClick={toggleNav}>Add New</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
