import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import auth from "../../../services/authService";

import WithTitle from "../../../hoc/WithTitle";
import CheckOut from "../ui/CheckOut";

import "../styles/BillingPage.scss";

const BillingPage = () => {
  const userDetails = auth.getCurrentUser();

  const {
    billingDetails: { currentPlan },
  } = userDetails;

  const [isCheckingOut, setisCheckingOut] = React.useState(null);
  const [subscriptionDetails, setsubscriptionDetails] = React.useState({});

  const handleIsCheckingOut = (isCheckingOut, subscriptionDetails) => {
    setisCheckingOut(isCheckingOut);
    setsubscriptionDetails(subscriptionDetails);
  };

  const getCurrentPlanPrice = (priceCardsArray) => {
    const currentPriceIndex = priceCardsArray.findIndex(
      (el) => el.priceName === currentPlan
    );
    return priceCardsArray[currentPriceIndex].amount;
  };

  const priceCards = [
    {
      icon: "charging-station",
      amount: 8.0,
      minUnit: 100,
      maxUnit: 499,
      unit: "Kwh",
      nameDescription:
        "Perfect for single room apartments with low inductive loads ",
      priceName: "starter",
      details: [
        "1 metering device",
        "2 sub-accounts",
        "Up to 3 appliances with 240v avg rating",
        "Lasts up to 800 hrs",
      ],
    },

    {
      icon: "file-invoice",
      amount: 7.5,
      minUnit: 500,
      maxUnit: 999,
      unit: "Kwh",
      nameDescription: "Suitable for 2-5 bedroom flats and duplexes",
      priceName: "small",
      details: [
        "1 metering device",
        "5 sub-accounts",
        "Up to 10 appliances with 240v avg rating",
        "Lasts up to 800 hrs",
        "save 6%",
      ],
    },

    {
      icon: "stopwatch",
      amount: 6.0,
      minUnit: 1000,
      maxUnit: 1499,
      unit: "Kwh",
      nameDescription: "Suitable for companies, hotels and other businesses",
      priceName: "basic",
      details: [
        "2 metering device",
        "15 sub-accounts",
        "Up to 10 appliances with 240v avg rating",
        "Lasts up to 800 hrs",
        "save 25%",
      ],
    },

    {
      icon: "bolt",
      amount: 5.0,
      minUnit: 1500,
      maxUnit: 1999,
      unit: "Kwh",
      nameDescription:
        "Suitable industries that deal with high consumption machinery",
      priceName: "premium",
      details: [
        "4 metering device",
        "25 sub-accounts",
        "Up to 10 appliances with 240v avg rating",
        "Lasts up to 800 hrs",
        "save 37%",
      ],
    },
  ];

  return (
    <div className="billing-page-wrapper">
      <CheckOut
        handleIsOpenPopUp={handleIsCheckingOut}
        isOpenPopUp={isCheckingOut}
        subscriptionDetails={subscriptionDetails}
      />

      <div className="billing-page-holder">
        <div className="billing-page-intro">
          <div className="billing-page-icon">
            <span>
              <FontAwesomeIcon icon="file-invoice" />
            </span>
          </div>

          <small>
            choose a billing package now, get any amount of electricity unit
            within the range of your package and pay per Kwh
          </small>
        </div>
        <div className="price-cards-holder">
          {priceCards.map((el, index, arr) => (
            <div
              key={index}
              className={
                currentPlan === el.priceName
                  ? "price-card-active"
                  : "price-card"
              }
            >
              <div className="price-name">
                <h4>
                  {el.priceName}
                  {currentPlan && currentPlan === el.priceName && (
                    <span>
                      <FontAwesomeIcon icon="check-circle" />
                    </span>
                  )}
                </h4>
                <small> {el.nameDescription} </small>
              </div>

              <div className="price-details">
                <div className="unit">
                  <small>
                    ({el.minUnit} to {el.maxUnit}) <span>{el.unit}</span>{" "}
                  </small>
                </div>

                <div className="price-amount-holder">
                  <div className="price-amount">
                    <span>NGN</span>
                    <h3> {el.amount} </h3>
                  </div>
                  <div className="price-description">
                    <span>per kwh billed on purchase</span>
                  </div>
                </div>
              </div>

              <div className="price-description-list">
                {el.details.map((el, index) => (
                  <li key={index}>
                    <FontAwesomeIcon icon="check" />
                    <small> {el} </small>
                  </li>
                ))}
              </div>

              <div className="pay-button">
                <button
                  onClick={() => handleIsCheckingOut(true, el)}
                  className={currentPlan === null ? "subscribe" : ""}
                >
                  {currentPlan !== null
                    ? currentPlan === el.priceName
                      ? "buy now"
                      : el.amount < getCurrentPlanPrice(arr)
                      ? "Upgrade"
                      : "Downgrade"
                    : "subscribe"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithTitle({ component: BillingPage, title: "Billing" });
