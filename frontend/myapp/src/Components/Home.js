import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Home.css';

const Home = () => {
    return (
        <div className="container">
            <div className="jumbotron mt-3">
                <h1 className="display-4">Welcome to E-Mart!</h1>
                <p className="lead">Your one-stop destination for electronic products.</p>
                <hr className="my-4" />
                <p>Explore our wide range of products:</p>
                <div className="row">
                    <div className="col-md-3">
                        <h5 className='home-5'>Laptops</h5>
                        <p>Find the latest laptops from top brands.</p>
                        <Link className="btn btn-primary btn-lg btn-block" to="/laptops">View Laptops</Link>
                    </div>
                    <div className="col-md-3">
                        <h5 className='home-5'>Mobiles</h5>
                        <p>Discover the latest smartphones with advanced features.</p>
                        <Link className="btn btn-primary btn-lg btn-block" to="/mobiles">View Mobiles</Link>
                    </div>
                    <div className="col-md-3">
                        <h5 className='home-5'>Smartwatches</h5>
                        <p>Stay connected with our range of smartwatches.</p>
                        <Link className="btn btn-primary btn-lg btn-block" to="/smartwatches">View Smartwatches</Link>
                    </div>
                    <div className="col-md-3">
                        <h5 className='home-5'>Headsets</h5>
                        <p>Experience immersive audio with our headsets.</p>
                        <Link className="btn btn-primary btn-lg btn-block" to="/headsets">View Headsets</Link>
                    </div>
                </div>
                <hr className="my-4" />
                <p>Manage your store:</p>
                <div className="row">
                    <div className="col-md-6">
                        <h5 className='home-5'>Add New Products</h5>
                        <p>Add new products to your inventory.</p>
                        <Link className="btn btn-success btn-lg btn-block" to="/add-new">Add New</Link>
                    </div>
                    <div className="col-md-6">
                        <h5 className='home-5'>View Reports</h5>
                        <p>View sales and profit reports.</p>
                        <Link className="btn btn-info btn-lg btn-block" to="/reports">View Reports</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
