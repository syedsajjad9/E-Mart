import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import Checkout from './Checkout'; // Import the Checkout component
import Image from '../Images/OIP3.webp'; // Import the image

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
        <div className="container">
            <h2>Headsets</h2>
            <div className="row">
                {headsets.map(headset => (
                    <div className="col-md-4" key={headset.id}>
                        <div className="card mb-4">
                            <img src={Image} className="card-img-top" alt={headset.name} />
                            <div className="card-body">
                                <h5 className="card-title">{headset.name}</h5>
                                <p className="card-text">Description: {headset.description}</p>
                                <p className="card-price">Price: ${headset.price}</p>
                                <button onClick={() => handleProceed(headset)} className="btn btn-primary">Proceed</button>
                            </div>
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
