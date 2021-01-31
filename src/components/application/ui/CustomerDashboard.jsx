import React from "react";

import { Link } from "react-router-dom";

import auth from "../../../services/authService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardAreaChart from "../charts/DashboardAreaChart";
import RegisterMeterForm from "../ui/RegisterMeterForm";

const CustomerDashboard = () => {
  const filterDataBy = ["Today", "last 7 days", "last 30 days", "last 1 year"];
  const [meterReading, setmeterReading] = React.useState("today");
  const [isFilterOpen, setisFilterOpen] = React.useState(false);

  const userDetails = auth.getCurrentUser();

  const { isVerifiedEmail, billingDetails } = userDetails;
  const { meterId, energyBalance } = billingDetails;

  const {
    billingDetails: { currentPlan },
  } = userDetails;

  const [isRegisteringMeter, setisRegisteringMeter] = React.useState(
    !meterId || null
  );

  const meterCards = [
    { icon: "charging-station", data: "53.98", unit: "KWh" },
    {
      icon: "file-invoice",
      data: energyBalance,
      unit: "KWh",
      title: "units left",
      button: "buy power",
      critical: false,
    },
    { icon: "stopwatch", data: "725", unit: "Hrs", title: "spent this month" },
    {
      icon: "bolt",
      data: "53.98",
      unit: "KWh",
      title: "consumed today",
      increase: false,
      decrease: true,
      difference: "20.5",
      active: true,
    },
  ];

  const handleOpenFilter = () => {
    setisFilterOpen(!isFilterOpen);
  };

  const handleFilterMeterReadings = (meterReading) => {
    setmeterReading(meterReading);
  };

  const handleIsRegisteringMeter = (value) => {
    setisRegisteringMeter(value);
  };

  return (
    <div>
      <RegisterMeterForm
        isOpenPopUp={isRegisteringMeter}
        handleIsOpenPopUp={handleIsRegisteringMeter}
        userDetails={userDetails}
      />

      <div className="dashboard-control-panel">
        {!isVerifiedEmail && meterId && (
          <div className="verify-email">
            <div className="icon-holder">
              <FontAwesomeIcon icon="exclamation" />
            </div>
            <small>
              Hi {userDetails.fullName} , please check your mailbox to verify
              your email and have access to all Trail features. Or you can
            </small>

            {/* <button onClick={() => window.location.href = `mailto:${userDetails.email}`} >
                            Verify now
                        </button> */}

            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify now
            </a>
          </div>
        )}

        {!meterId && !isRegisteringMeter && (
          <div className="no-meterId">
            <h3>Hey there!, register a new meter to begin</h3>
            <div className="no-meterId-action">
              <button onClick={() => handleIsRegisteringMeter(true)}>
                register meter
              </button>
            </div>
          </div>
        )}

        {meterId && (
          <React.Fragment>
            <div>
              <div className="dashboard-meter">
                {meterCards.map((el, index) => (
                  <div
                    key={index}
                    className={el.active ? "meter-card-active" : "meter-card"}
                  >
                    <div className="meter-card-icon">
                      <span>
                        <FontAwesomeIcon icon={el.icon} />
                      </span>
                    </div>

                    {el.button && (
                      <h3 className={el.critical ? "critical" : "not-critical"}>
                        {el.data} <span> {el.unit} </span>
                      </h3>
                    )}
                    {!el.button && (
                      <h3>
                        {currentPlan ? el.data : 0} <span> {el.unit} </span>
                      </h3>
                    )}
                    <small> {el.title} </small>

                    {currentPlan && (
                      <small>
                        <span className="difference-increase">
                          {el.increase && (
                            <FontAwesomeIcon icon="arrow-alt-circle-up" />
                          )}
                        </span>
                        <span className="difference-decrease">
                          {el.decrease && (
                            <FontAwesomeIcon icon="arrow-alt-circle-down" />
                          )}
                        </span>
                        {(el.increase || el.decrease) && (
                          <span> {el.difference}% </span>
                        )}
                      </small>
                    )}

                    {el.button && <Link to="/app/billing"> {el.button} </Link>}
                  </div>
                ))}
              </div>

              <div className="dashboard-stats-card">
                <div className="stats-header">
                  <div>
                    <h3>
                      Meter readings of <span> {meterReading} </span>
                    </h3>
                  </div>
                  <div className="filter">
                    <span onClick={handleOpenFilter}>
                      <FontAwesomeIcon icon="ellipsis-h" pull="right" />
                    </span>
                    {isFilterOpen && (
                      <div className="filter-card">
                        {filterDataBy.map((el, index) => (
                          <li
                            key={index}
                            onClick={() => handleFilterMeterReadings(el)}
                          >
                            {el}
                          </li>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="chart">
                  {!currentPlan && <h3>No Meter Data yet. Buy some units</h3>}
                  {currentPlan && <DashboardAreaChart />}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
