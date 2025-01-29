import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'animate.css';
import '../Css/Checkout.css';

const Checkout = ({ selectedProduct, onCloseModal }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [convenienceFee, setConvenienceFee] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [step, setStep] = useState(1);
    const [purchasedProduct, setPurchasedProduct] = useState(null);

    useEffect(() => {
        if (selectedProduct) {
            calculateCost(selectedProduct, paymentMethod);
        }
    }, [selectedProduct, paymentMethod]);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(emailValue);
    
        if (!isValidEmail) {
            setErrorMessage('Please enter a valid email address.');
        } else {
            setErrorMessage('');
        }
    };

    const handleOtpChange = (e) => {
        const otpValue = e.target.value;
        if (/^\d*$/.test(otpValue)) { // Only update if the input is a number
            setOtp(otpValue);
        }
    };

    const handleProceed = () => {
        if (paymentMethod && email) {
            axios.post('http://localhost:8082/api/send-otp', { email })
                .then(response => {
                    setSuccessMessage(response.data.message);
                    setErrorMessage('');
                    setStep(2);
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error || 'Failed to send OTP. Please try again.');
                    setSuccessMessage('');
                });
        } else {
            setErrorMessage('Please select a payment method and enter your email.');
        }
    };

    const handleVerifyOtp = () => {
        axios.post('http://localhost:8082/api/verify-otp', { email, otp })
            .then(response => {
                setIsOtpVerified(true);
                setSuccessMessage(response.data.message);
                setErrorMessage('');

                // Automatically submit payment details
                handleSubmit();
            })
            .catch(error => {
                setErrorMessage(error.response.data.error || 'Failed to verify OTP. Please try again.');
                setSuccessMessage('');
            });
    };

    const handleSubmit = () => {
        const amount = selectedProduct ? selectedProduct.price : 0;

        axios.post('http://localhost:8082/api/store-product-details', {
            productId: selectedProduct.id,
            paymentMethod,
            amount,
            convenienceFee,
            totalCost,
            email,
            otp,
            category: selectedProduct.category
        })
            .then(response => {
                setSuccessMessage(response.data.message);
                setErrorMessage('');
                setPurchasedProduct(selectedProduct);
                setStep(3);
            })
            .catch(error => {
                setErrorMessage(error.response.data.error || 'Failed to store payment details. Please try again.');
                setSuccessMessage('');
            });
    };

    const calculateCost = (product, paymentMethod) => {
        const baseAmount = parseFloat(product.price);
        let fee = 0;

        if (paymentMethod === 'credit') {
            fee = 0.03 * baseAmount;
        } else if (paymentMethod === 'debit') {
            fee = 0.02 * baseAmount;
        } else if (paymentMethod === 'netbanking') {
            fee = 0.01 * baseAmount;
        }

        setConvenienceFee(fee.toFixed(2));
        setTotalCost((baseAmount + fee).toFixed(2));
    };

    return (
        <div className="checkout-container animate__animated animate__fadeIn">
            <h1>Checkout</h1>
            {/* <hr style={{ borderBottom: '1px solid black' }} /> */}
            {selectedProduct ? (
                <div className="checkout-content">
                    {step === 1 && (
                        <>
                            <div className="payment-method details-1">
                                <h2>Select Payment Method</h2>
                                <button
                                    className={`payment-button ${paymentMethod === 'credit' ? 'selected' : ''}`}
                                    onClick={() => handlePaymentMethodChange('credit')}
                                >
                                    Credit Card
                                </button>
                                <button
                                    className={`payment-button ${paymentMethod === 'debit' ? 'selected' : ''}`}
                                    onClick={() => handlePaymentMethodChange('debit')}
                                >
                                    Debit Card
                                </button>
                                <button
                                    className={`payment-button ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                                    onClick={() => handlePaymentMethodChange('netbanking')}
                                >
                                    Net Banking
                                </button>
                                <button
                                    className={`payment-button ${paymentMethod === 'wallet' ? 'selected' : ''}`}
                                    onClick={() => handlePaymentMethodChange('wallet')}
                                >
                                    Wallet
                                </button>
                            </div>
                            <div className="details">
                                <div className="product-details">
                                    <h2>Product: <span className='product-span'>{selectedProduct.name}</span></h2>
                                    <p>Description: {selectedProduct.description}</p>
                                    <p>Price: ${selectedProduct.price}</p>
                                    
                                    <p>Convenience Fee: ${convenienceFee}</p>
                                </div>
                                
                                <hr style={{ borderBottom: '1px dashed black' }} />
                                <p className='checkout-totalcost'>Total Cost: ${totalCost}</p>
                                <hr style={{ borderBottom: '1px dashed black' }} />
                                <label>
                                    Email:
                                    <input type="email" placeholder='Enter Email Address' value={email} onChange={handleEmailChange} required />
                                </label>
                                <br />
                                <button className="checkout-button animate__animated animate__bounceIn" onClick={handleProceed}>Next</button>
                                {errorMessage && <p className="error-message animate__animated animate__fadeIn">{errorMessage}</p>}
                                {successMessage && <p className="success-message animate__animated animate__fadeIn">{successMessage}</p>}
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="details details-2">
                                <div className="product-details">
                                    <h2>Product: <span className='product-span'>{selectedProduct.name}</span></h2>
                                    <p>Description: {selectedProduct.description}</p>
                                    <p>Price: ${selectedProduct.price}</p>
                                    <p>Payment Method: {paymentMethod}</p> {/* Added payment method details */}
                                    <p>Convenience Fee: ${convenienceFee}</p>
                                    <hr />
                                    <p className='checkout-totalcost'>Total Cost: ${totalCost}</p>
                                    <hr />
                                </div>
                                <label>
                                    OTP:
                                    <input type="text" placeholder='Enter OTP' value={otp} onChange={handleOtpChange} required pattern="\d*" />
                                </label>
                                <br />
                                <button className="checkout-button animate__animated animate__bounceIn verify_button" onClick={handleVerifyOtp}>Verify OTP</button>

                                {errorMessage && <p className="error-message animate__animated animate__fadeIn">{errorMessage}</p>}
                                {successMessage && <p className="success-message animate__animated animate__fadeIn">{successMessage}</p>}
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div className="details details-3">
                            <h2>Purchase Details</h2>
                            <div className="product-details product-details-3">
                                <h3>Product: <span className='product-span'>{purchasedProduct.name}</span></h3>
                                <p>Description: {purchasedProduct.description}</p>
                                <p>Price: ${purchasedProduct.price}</p>
                                <p>Payment Method: {paymentMethod}</p> {/* Added payment method details */}
                                <p>Convenience Fee: ${convenienceFee}</p>
                                <hr />
                                <p className='checkout-totalcost'>Total Cost: ${totalCost}</p>
                                <hr />
                            </div>
                            <p>Thank you for your purchase!</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default Checkout;
