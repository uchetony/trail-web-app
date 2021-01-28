import React, { useState } from "react";

import { PaystackButton } from "react-paystack";
import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import numeral from "numeral";

import auth from "../../../services/authService";
import { verifyUserPayment } from "../../../services/paymentService";

import WithPopUp from "../../../hoc/WithPopUp";

import "../styles/CheckOut.scss";

const INITIAL_STATE = {
  priceName: "",
  baseAmount: 0,
  quantity: "",
  totalAmount: 0,
  paystackAmount: 0,
  isVerifying: false,
};

const CheckOut = ({ subscriptionDetails }) => {
  const userDetails = auth.getCurrentUser();

  const { amount, minUnit, maxUnit } = subscriptionDetails;

  const [checkOutDetails, setCheckOutDetails] = useState({ ...INITIAL_STATE });

  const capitalizeInitial = (word) => {
    if (typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const calculateTotalAmount = (amount, quantiity) => {
    return amount * quantiity;
  };

  const calculatePaystackAmount = React.useCallback(
    (amount, quantiity, currency) => {
      const currencyDenom = [{ currency: "NGN", denom: 100 }];
      let paystackAmount = null;
      const totalAmount = calculateTotalAmount(amount, quantiity);
      currencyDenom.forEach((curr) => {
        currency === curr.currency &&
          (paystackAmount = totalAmount * curr.denom);
      });
      return paystackAmount;
    },
    []
  );

  React.useEffect(() => {
    const { priceName, amount, minUnit } = subscriptionDetails;

    const checkOutDetails = {
      priceName,
      baseAmount: amount,
      quantity: minUnit,
      totalAmount: calculateTotalAmount(amount, minUnit),
      paystackAmount: calculatePaystackAmount(amount, minUnit, "NGN"),
    };

    setCheckOutDetails({ ...checkOutDetails });
  }, [subscriptionDetails, calculatePaystackAmount]);

  const updateCheckoutDetails = (amount, quantity, currency = "NGN") => {
    setCheckOutDetails({
      ...checkOutDetails,
      quantity,
      totalAmount: calculateTotalAmount(amount, quantity),
      paystackAmount: calculatePaystackAmount(amount, quantity, currency),
    });
  };

  const handleQuantityChange = (incrementer) => {
    const currentQuantity = Number(checkOutDetails.quantity);
    let incrementedQuantity = currentQuantity + incrementer;
    if (
      (currentQuantity <= minUnit && incrementer === -1) ||
      (currentQuantity < minUnit && incrementer === 0)
    ) {
      updateCheckoutDetails(amount, minUnit);
      NotificationManager.error(
        `sorry, due to your subscription plan you cannot purchase electricity units below ${minUnit} Kwh`,
        "Unit too low",
        5000
      );
      return;
    }

    if (
      (currentQuantity >= maxUnit && incrementer === 1) ||
      (currentQuantity > maxUnit && incrementer === 0)
    ) {
      updateCheckoutDetails(amount, maxUnit);
      NotificationManager.error(
        `sorry, due to your subscription plan you cannot purchase electricity units above ${maxUnit} Kwh`,
        "Unit too high",
        5000
      );
      return;
    }

    updateCheckoutDetails(amount, incrementedQuantity);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    updateCheckoutDetails(amount, value);
  };

  // paystack configurations
  const paystackConfig = {
    reference: new Date().getTime(),
    email: userDetails.email,
    amount: checkOutDetails.paystackAmount,
    publicKey: process.env.REACT_APP_PAYSTACK_API_KEY,
  };

  const verifyPayment = async (reference) => {
    setCheckOutDetails({ ...checkOutDetails, isVerifying: true });
    const userId = userDetails._id;
    const paymentDetails = {
      userId,
      reference,
      energyBought: checkOutDetails.quantity,
      subscriptionPlan: checkOutDetails.priceName,
    };

    try {
      const response = await verifyUserPayment(userId, paymentDetails);

      auth.signInWithJwt(response.headers["x-auth-token"]);
      setCheckOutDetails({ ...checkOutDetails, isVerifying: false });
      window.location = "/app";
      NotificationManager.success(
        `You just bought ${checkOutDetails.quantity} kwh units`,
        "Successful!",
        5000
      );
    } catch (ex) {
      setCheckOutDetails({ ...checkOutDetails, isVerifying: false });
      if (ex.response) {
        const { data } = ex.response;
        NotificationManager.error(data, "Error!", 5000);
      }
    }
  };

  const payNowButtonConfig = {
    ...paystackConfig,
    text: "Pay Now",
    onSuccess: ({ reference }) => {
      verifyPayment(reference);
    },
    onClose: () => null,
  };

  return (
    <div className="checkout-holder">
      {!checkOutDetails.isVerifying && (
        <div>
          <div className="checkout-holder-top">
            <h3> {capitalizeInitial(checkOutDetails.priceName)} plan </h3>
            <h5> NGN {checkOutDetails.baseAmount} per Kwh </h5>
          </div>
          <div className="price-section">
            <div className="price-picker">
              <input
                className="price-picker-display"
                onBlur={() => handleQuantityChange(0)}
                onChange={handleInputChange}
                value={checkOutDetails.quantity}
                type="text"
              />
              <span className="price-picker-text">units of Kwh</span>
              <span
                className="price-picker-decrement"
                onClick={() => handleQuantityChange(-1)}
              >
                <FontAwesomeIcon icon="minus" />
              </span>
              <span
                className="price-picker-increment"
                onClick={() => handleQuantityChange(1)}
              >
                <FontAwesomeIcon icon="plus" />
              </span>
            </div>
            <small>
              This subscription package allows you to purchase between {minUnit}{" "}
              and {maxUnit} Kwh{" "}
            </small>
          </div>

          <div className="checkout-holder-total">
            <h3>
              <span>Total</span>
              <span>
                NGN {numeral(checkOutDetails.totalAmount).format("0,0.0")}
              </span>
            </h3>
          </div>

          <PaystackButton className="paystack-button" {...payNowButtonConfig} />
        </div>
      )}

      {checkOutDetails.isVerifying && (
        <div className="verifying">
          <h3>Updating units</h3>
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      )}
    </div>
  );
};

export default WithPopUp({ component: CheckOut });
