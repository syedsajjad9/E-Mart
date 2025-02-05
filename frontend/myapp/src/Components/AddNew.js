import React, { useState } from 'react';
import axios from 'axios';
import '../Css/AddNew.css';
import productImage from '../Images/addnew.webp'; // Replace with actual image path

const AddNew = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'laptop'
    });
    const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.price) {
            setAlertMessage('Please fill in all required fields');
            return;
        }
        axios.post('http://localhost:8082/api/add-new', formData)
            .then(response => {
                console.log(response.data);
                setAlertMessage('Product added successfully');
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'laptop'
                });
            })
            .catch(error => {
                console.error('Error adding new product:', error);
                setAlertMessage('Error adding new product. Please try again.');
            });
    };

    return (
        <div className="add-new-wrapper">
            <div className="add-new-container">
                <h2 className="add-new-heading">Add New Product</h2>
                {alertMessage && <div className="add-new-alert">{alertMessage}</div>}
                <form className="add-new-form" onSubmit={handleSubmit}>
                    <div className="add-new-form-group">
                        <label className="add-new-label">Product Name:</label>
                        <input type="text" placeholder='Enter Product Name' className="add-new-form-control" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="add-new-form-group">
                        <label className="add-new-label">Description:</label>
                        <textarea className="add-new-form-control" placeholder='Description...' name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="add-new-form-group">
                        <label className="add-new-label">Price:</label>
                        <input type="number" placeholder='Price $' className="add-new-form-control" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="add-new-form-group">
                        <label className="add-new-label">Category:</label>
                        <select className="add-new-form-control" name="category" value={formData.category} onChange={handleChange}>
                            <option value="laptop">Laptop</option>
                            <option value="mobile">Mobile</option>
                            <option value="headset">Headset</option>
                            <option value="smartwatch">Smart Watch</option>
                        </select>
                    </div>
                    <button type="submit" className="add-new-btn">Submit</button>
                </form>
            </div>
            <div className="add-new-image">
                <img src={productImage} alt="Product" />
            </div>
        </div>
    );
};

export default AddNew;
