import React, { useState } from 'react'
import '../styles/CheckOut.scss'
import {PaystackButton} from 'react-paystack';
import { useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import WithPopUp from '../../../hoc/WithPopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const INITIAL_STATE ={
    priceName: '',
    baseAmount: 0,
    quantity: '',
    totalAmount: 0,
    paystackAmount: 0,
    isVerifying: false
}

const CheckOut = ({subscriptionDetails, userDetails, handleIsOpenPopUp, handleUpdateToken}) => {

    const {priceName, amount, minUnit, maxUnit} = subscriptionDetails;

    const [checkOutDetails, setCheckOutDetails] = useState({...INITIAL_STATE})

    const calculateTotalAmount = (amount, quantiity) => {
        return amount * quantiity;
    }
    
    const calculatePaystackAmount = (amount, quantiity, currency) => {
        const currencyDenom = [{currency: 'NGN', denom: 100}]
        let paystackAmount = null;
        const totalAmount = calculateTotalAmount(amount, quantiity);
        currencyDenom.forEach((curr) => {
            currency === curr.currency && (paystackAmount = totalAmount * curr.denom)
        })
        return paystackAmount;
    }

    useEffect(() => {
        setCheckOutDetails({
            ...checkOutDetails,
            priceName,
            baseAmount: amount,
            quantity: minUnit,
            totalAmount: calculateTotalAmount(amount, minUnit),
            paystackAmount: calculatePaystackAmount(amount, minUnit, 'NGN'),
        })
    }, [subscriptionDetails])

    const updateCheckoutDetails = (amount, quantity, currency='NGN') => {
        setCheckOutDetails({
            ...checkOutDetails,
            quantity,
            totalAmount: calculateTotalAmount(amount, quantity),
            paystackAmount: calculatePaystackAmount(amount, quantity, currency)
        })
    }

    const handleQuantityChange = (incrementer) => {
        const currentQuantity = Number(checkOutDetails.quantity);
        let incrementedQuantity = currentQuantity + incrementer;
        if((currentQuantity <= minUnit && incrementer === -1) || (currentQuantity < minUnit && incrementer === 0)) {
            updateCheckoutDetails(amount, minUnit)
            NotificationManager.error(`sorry, due to your subscription plan you cannot purchase electricity units below ${minUnit} Kwh`, 'Unit too low', 5000)
            return
        }

        if((currentQuantity >= maxUnit && incrementer === 1) || (currentQuantity > maxUnit && incrementer === 0)) {
            updateCheckoutDetails(amount, maxUnit)
            NotificationManager.error(`sorry, due to your subscription plan you cannot purchase electricity units above ${maxUnit} Kwh`, 'Unit too high', 5000)
            return
        }

        updateCheckoutDetails(amount, incrementedQuantity)
            
    }

    const handleInputChange = e => {
        const {value} = e.target;
        updateCheckoutDetails(amount, value)
    }

    // paystack configurations
    const paystackConfig = {
        reference: (new Date().getTime()),
        email: userDetails.email,
        amount: checkOutDetails.paystackAmount,
        publicKey: process.env.REACT_APP_PAYSTACK_API_KEY
    }

    const verifyPayment = async (reference) => {
        setCheckOutDetails({...checkOutDetails, isVerifying: true});
        const userId = userDetails._id;
        const verficationDetails = {
            userId,
            reference,
            energyBought: checkOutDetails.quantity,
            subscriptionPlan: checkOutDetails.priceName
        }

        try {
            const res = await axios.post( `${process.env.REACT_APP_ENDPOINT_BASE_URL}/api/payments/${userId}/verify`, verficationDetails);
            NotificationManager.success(`You just bought ${checkOutDetails.quantity} kwh units`, 'Successful!', 5000);
            
            // update token and redirect user
            const {token} = res.data;
            handleUpdateToken(token); 
            window.location = "/app"

        } catch(ex) {
            if(ex.response) {
                const {data} = ex.response
                setCheckOutDetails({...checkOutDetails, isVerifying: false});
                NotificationManager.error(data, 'Error!', 5000);
            } else {
                setCheckOutDetails({...checkOutDetails, isVerifying: false});
                NotificationManager.error('Could not connect to server', 'Error!', 5000);
            }
        }
    }

    const payNowButtonConfig = {
        ...paystackConfig,
        text: 'Pay Now',
        onSuccess: (response) => {
            verifyPayment(response.reference);
        },
        onClose: () => null
    }

    return (
        <div className="checkout-holder">
            {!checkOutDetails.isVerifying && (
                <div>
                    <h3> {checkOutDetails.priceName} </h3>
                    <h5> NGN {checkOutDetails.baseAmount} per Kwh </h5>
                    <div className="price-section">
                        <div className="price-picker">
                            <input className="price-picker-display" onBlur={() =>handleQuantityChange(0)} onChange={handleInputChange} value={checkOutDetails.quantity} type="text"/>
                            <span className="price-picker-text">units of Kwh</span>
                            <span className="price-picker-decrement" onClick={() =>handleQuantityChange(-1)} ><FontAwesomeIcon icon="minus" /></span>
                            <span className="price-picker-increment" onClick={() => handleQuantityChange(1)} ><FontAwesomeIcon icon="plus" /></span>
                        </div>
                        <small>This subscription package allows you to purchase between {minUnit} and {maxUnit} Kwh </small>
                    </div>

                    <div className="checkout-holder-total" >
                        <h3> 
                            <span>Total</span>
                            <span>NGN {checkOutDetails.totalAmount}</span> 
                        </h3>
                    </div>
                    
                    <PaystackButton className="paystack-button" {...payNowButtonConfig}/>
                </div>
            )}

            {checkOutDetails.isVerifying && (
                <FontAwesomeIcon icon="spinner" pulse />
            )}
        </div>
    )
}

export default WithPopUp({component: CheckOut});
