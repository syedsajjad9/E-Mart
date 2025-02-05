import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import Checkout from './Checkout'; // Import the Checkout component
import Image from '../Images/OIP3.webp'; // Import the static image
import '../Css/Laptops.css'; // Import the laptops CSS

const Headsets = () => {
    const [headsets, setHeadsets] = useState([]);
    const [selectedHeadset, setSelectedHeadset] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8082/api/headsets')
            .then(response => {
                setHeadsets(response.data);
            })
            .catch(error => {
                console.error('Error fetching headsets:', error);
            });
                    // Add the fade-in effect class once the component is mounted
        document.querySelector('.headsets-container').classList.add('fade-in');
    }, []);

    const handleProceed = (headset) => {
        setSelectedHeadset(headset);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedHeadset(null);
    };

    return (
        <div className="headsets-container">
            <h2>Headsets</h2>
            <div className="headsets-card-container">
                {headsets.map(headset => (
                    <div className="headsets-card" key={headset.id}>
                        <img src={Image} className="headsets-card-img-top" alt={headset.name} />
                        <div className="headsets-card-body">
                            <h5 className="headsets-card-title">{headset.name}</h5>
                            <p className="headsets-card-text">Description: {headset.description}</p>
                            <p className="headsets-card-price">Price: ${headset.price}</p>
                            <button onClick={() => handleProceed(headset)} className="headsets-btn-primary">Proceed</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal}>
                <Checkout selectedProduct={selectedHeadset} onCloseModal={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default Headsets;