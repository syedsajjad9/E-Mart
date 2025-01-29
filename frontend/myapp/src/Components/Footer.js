import React from 'react';
import '../Css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <h6  >Address</h6>
                        <p>Hitech City<br />Hyderabad, Telangana, 500001.</p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <h6 >Contact Us</h6>
                        <p>Email: info@example.com<br />Phone: +1 234-567-8901</p>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <h6 >Follow Us</h6>
                        <ul className="list-unstyled">
                            <li><a href="#!">Facebook</a></li>
                            <li><a href="#!">Twitter</a></li>
                            <li><a href="#!">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <p className="small">&copy; 2024 E-Mart. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
