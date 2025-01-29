// Laptops.js
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Css/Laptops.css';
import Image from '../Images/OIP1.jpg';
import Modal from './Modal'; // Import the Modal component
import Checkout from './Checkout'; // Import the Checkout component

const Laptops = () => {
    const [laptops, setLaptops] = useState([]);
    const [selectedLaptop, setSelectedLaptop] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8082/api/laptops')
            .then(response => {
                setLaptops(response.data);
            })
            .catch(error => {
                console.error('Error fetching laptops:', error);
            });
    }, []);

    const handleProceed = (laptop) => {
        setSelectedLaptop(laptop);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLaptop(null);
    };

    return (
        <div className="container">
            <h2>Laptops</h2>
            <div className="card-container">
                {laptops.map(laptop => (
                    <div className="card" key={laptop.id}>
                        <img src={Image} className="card-img-top" alt={laptop.name} />
                        <div className="card-body">
                            <h5 className="card-title">{laptop.name}</h5>
                            <p className="card-text">Description: {laptop.description}</p>
                            <p className="card-price">Price: ${laptop.price}</p>
                            <button onClick={() => handleProceed(laptop)} className="btn btn-primary">Proceed</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal}>
                <Checkout selectedProduct={selectedLaptop} />
            </Modal>
        </div>
    );
};

export default Laptops;
