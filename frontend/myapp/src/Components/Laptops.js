import React, { useEffect, useState } from 'react';
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
             // Add the fade-in effect class once the component is mounted
        document.querySelector('.laptops-container').classList.add('fade-in');
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
        <div className="laptops-container">
            <h2>Laptops</h2>
            <div className="laptops-card-container">
                {laptops.map(laptop => (
                    <div className="laptops-card" key={laptop.id}>
                        <img src={Image} className="laptops-card-img-top" alt={laptop.name} />
                        <div className="laptops-card-body">
                            <h5 className="laptops-card-title">{laptop.name}</h5>
                            <p className="laptops-card-text">Description: {laptop.description}</p>
                            <p className="laptops-card-price">Price: ${laptop.price}</p>
                            <button onClick={() => handleProceed(laptop)} className="laptops-btn-primary">Proceed</button>
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