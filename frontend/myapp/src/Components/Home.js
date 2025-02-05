import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
            
                <h1 className="hero-title">Discover the Latest in Electronics</h1>
                <p className="hero-subtitle">Your one-stop destination for top-notch electronic products.</p>
                <Link className="hero-button" to="/Laptops">Shop Now</Link>
            </div>
            <section className="products-section">
                <h2 className="section-title">Explore Our Products</h2>
                <div className="products-grid">
                    <div className="product-card">
                        <h5 className="product-title">Laptops</h5>
                        <p className="product-description">Find the latest laptops from top brands.</p>
                        <Link className="product-button" to="/laptops">View Laptops</Link>
                    </div>
                    <div className="product-card">
                        <h5 className="product-title">Mobiles</h5>
                        <p className="product-description">Discover the latest smartphones with advanced features.</p>
                        <Link className="product-button" to="/mobiles">View Mobiles</Link>
                    </div>
                    <div className="product-card">
                        <h5 className="product-title">Smartwatches</h5>
                        <p className="product-description">Stay connected with our range of smartwatches.</p>
                        <Link className="product-button" to="/smartwatches">View Smartwatches</Link>
                    </div>
                    <div className="product-card">
                        <h5 className="product-title">Headsets</h5>
                        <p className="product-description">Experience immersive audio with our headsets.</p>
                        <Link className="product-button" to="/headsets">View Headsets</Link>
                    </div>
                </div>
            </section>
            <section className="manage-store-section">
                <h2 className="section-title">Manage Your Store</h2>
                <div className="manage-store-grid">
                    <div className="manage-card">
                        <h5 className="manage-title">Add New Products</h5>
                        <p className="manage-description">Add new products to your inventory.</p>
                        <Link className="manage-button" to="/add-new">Add New</Link>
                    </div>
                    <div className="manage-card">
                        <h5 className="manage-title">View Reports</h5>
                        <p className="manage-description">View sales and profit reports.</p>
                        <Link className="manage-button" to="/reports">View Reports</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;