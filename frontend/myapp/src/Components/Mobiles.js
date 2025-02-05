import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import Checkout from './Checkout'; // Import the Checkout component
import Image from '../Images/OIP2.jpeg'; // Import the static image
import '../Css/Laptops.css'; // Import the laptops CSS

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
             // Add the fade-in effect class once the component is mounted
        document.querySelector('.mobiles-container').classList.add('fade-in');
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
        <div className="mobiles-container">
            <h2>Mobiles</h2>
            <div className="mobiles-card-container">
                {mobiles.map(mobile => (
                    <div className="mobiles-card" key={mobile.id}>
                        <img src={Image} className="mobiles-card-img-top" alt={mobile.name} />
                        <div className="mobiles-card-body">
                            <h5 className="mobiles-card-title">{mobile.name}</h5>
                            <p className="mobiles-card-text">Description: {mobile.description}</p>
                            <p className="mobiles-card-price">Price: ${mobile.price}</p>
                            <button onClick={() => handleProceed(mobile)} className="mobiles-btn-primary">Proceed</button>
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