import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import Checkout from './Checkout'; // Import the Checkout component
import Image from '../Images/OIP4.jpg'; // Import the static image
import '../Css/Laptops.css'; // Import the laptops CSS

const SmartWatches = () => {
    const [smartWatches, setSmartWatches] = useState([]);
    const [selectedSmartWatch, setSelectedSmartWatch] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8082/api/smartwatches')
            .then(response => {
                setSmartWatches(response.data);
            })
            .catch(error => {
                console.error('Error fetching smartwatches:', error);
            });
                   // Add the fade-in effect class once the component is mounted
        document.querySelector('.smartwatches-container').classList.add('fade-in');
    }, []);

    const handleProceed = (smartWatch) => {
        setSelectedSmartWatch(smartWatch);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSmartWatch(null);
    };

    return (
        <div className="smartwatches-container">
            <h2>Smart Watches</h2>
            <div className="smartwatches-card-container">
                {smartWatches.map(smartWatch => (
                    <div className="smartwatches-card" key={smartWatch.id}>
                        <img src={Image} className="smartwatches-card-img-top" alt={smartWatch.name} />
                        <div className="smartwatches-card-body">
                            <h5 className="smartwatches-card-title">{smartWatch.name}</h5>
                            <p className="smartwatches-card-text">Description: {smartWatch.description}</p>
                            <p className="smartwatches-card-price">Price: ${smartWatch.price}</p>
                            <button onClick={() => handleProceed(smartWatch)} className="smartwatches-btn-primary">Proceed</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal}>
                <Checkout selectedProduct={selectedSmartWatch} onCloseModal={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default SmartWatches;