import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import Checkout from './Checkout'; // Import the Checkout component
import Image from '../Images/OIP2.jpeg'; // Import the image

const Mobiles = () => {
    const [mobiles, setMobiles] = useState([]);
    const [selectedMobile, setSelectedMobile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8082/api/mobiles')
            .then(response => {
                setMobiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching mobiles:', error);
            });
    }, []);

    const handleProceed = (mobile) => {
        setSelectedMobile(mobile);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMobile(null);
    };

    return (
        <div className="container">
            <h2>Mobiles</h2>
            <div className="row">
                {mobiles.map(mobile => (
                    <div className="col-md-4" key={mobile.id}>
                        <div className="card mb-4">
                            <img src={Image} className="card-img-top" alt={mobile.name} />
                            <div className="card-body">
                                <h5 className="card-title">{mobile.name}</h5>
                                <p className="card-text">Description: {mobile.description}</p>
                                <p className="card-price">Price: ${mobile.price}</p>
                                <button onClick={() => handleProceed(mobile)} className="btn btn-primary">Proceed</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal}>
                <Checkout selectedProduct={selectedMobile} onCloseModal={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default Mobiles;
