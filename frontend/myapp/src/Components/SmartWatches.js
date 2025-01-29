import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import Checkout from './Checkout'; // Import the Checkout component
import Image from '../Images/OIP4.jpg'; // Import the image

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
        <div className="container">
            <h2>Smart Watches</h2>
            <div className="row">
                {smartWatches.map(smartWatch => (
                    <div className="col-md-4" key={smartWatch.id}>
                        <div className="card mb-4">
                            <img src={Image} className="card-img-top" alt={smartWatch.name} />
                            <div className="card-body">
                                <h5 className="card-title">{smartWatch.name}</h5>
                                <p className="card-text">Description: {smartWatch.description}</p>
                                <p className="card-price">Price: ${smartWatch.price}</p>
                                <button onClick={() => handleProceed(smartWatch)} className="btn btn-primary">Proceed</button>
                            </div>
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
