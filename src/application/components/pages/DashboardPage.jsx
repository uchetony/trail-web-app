import React from 'react'
import '../styles/DashboardPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import DashboardAreaChart from '../charts/DashboardAreaChart';
import WithTitle from '../../../hoc/WithTitle';
import { Link } from 'react-router-dom';
import RegisterMeter from '../ui/RegisterMeter';
import { useEffect } from 'react';

const DashboardPage = ({userDetails, handleUpdateToken}) => {
    const filterDataBy = ["Today", "last 7 days", "last 30 days", "last 1 year"];
    const [meterReading, setmeterReading] = useState("today")
    const [isFilterOpen, setisFilterOpen] = useState(false);

    const {isVerifiedEmail, billingDetails} = userDetails;
    const {meterId, energyBalance} = billingDetails;

    const [isRegisteringMeter, setisRegisteringMeter] = useState(!meterId || null);

    const meterCards = [
        { icon: 'charging-station', data: '53.98', unit: 'KWh' },
        { icon: 'file-invoice', data: energyBalance, unit: 'KWh', title: 'units left', button: 'buy power', critical: false },
        { icon: 'stopwatch', data: '725', unit: 'Hrs', title: 'spent this month' },
        { icon: 'bolt', data: '53.98', unit: 'KWh', title: 'consumed today', increase: false, decrease: true, difference: '20.5' }
    ]

    const [activeCard, setActiveCard] = useState([9]);

    const handleOpenFilter = () => {
        setisFilterOpen(!isFilterOpen);
    }

    const handleFilterMeterReadings = (meterReading) => {
        setmeterReading(meterReading)
    }

    const handleIsRegisteringMeter = (value) => {
        setisRegisteringMeter(value)
    }

    return (
        <div className="dashboard-page-wrapper">

            {!isVerifiedEmail && (
                <div className="verify-email">
                    Hi {userDetails.fullName} , please verify your email
                </div>
            )}

            {(meterId) && (
                <React.Fragment>
                    <div className="dashboard-control-panel">
                        <div className="dashboard-meter">
                            {
                                meterCards.map((el, index) => (
                                    <div key={index} className={activeCard.includes(index) ? 'meter-card-active' : 'meter-card'} >
                                        <div className="meter-card-icon">
                                            <span>
                                                <FontAwesomeIcon icon={el.icon} />
                                            </span>
                                        </div>

                                        {el.button && <h3 className={el.critical ? 'critical' : 'not-critical'}>{el.data} <span> {el.unit} </span></h3>}
                                        {!el.button && <h3>{el.data} <span> {el.unit} </span></h3>}
                                        <small> {el.title} </small>

                                        <small>
                                            <span className="difference-increase"> {el.increase && <FontAwesomeIcon icon="arrow-alt-circle-up" />} </span>
                                            <span className="difference-decrease"> {el.decrease && <FontAwesomeIcon icon="arrow-alt-circle-down" />} </span>
                                            {(el.increase || el.decrease) && <span> {el.difference}% </span>}
                                        </small>

                                        {el.button && <Link to="/app/billing"> {el.button} </Link>}
                                        
                                    </div>
                                ))
                            }
                        </div>

                        <div className="dashboard-stats-card">
                            <div className="stats-header">
                                <div>
                                    <h3>Meter readings of <span> {meterReading} </span> </h3>
                                </div>
                                <div className="filter">
                                    <span onClick={handleOpenFilter}><FontAwesomeIcon icon="ellipsis-h" pull="right" /> </span>
                                    {isFilterOpen && (
                                        <div className="filter-card">
                                            {filterDataBy.map((el, index) =>
                                                <li key={index} onClick={() => handleFilterMeterReadings(el)}> {el} </li>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="chart">
                                <DashboardAreaChart />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}


                <div>
                    <RegisterMeter 
                        isOpenPopUp={isRegisteringMeter}
                        handleIsOpenPopUp={handleIsRegisteringMeter}
                        userDetails={userDetails}
                        handleUpdateToken={handleUpdateToken}
                    />

                    {(!meterId && !isRegisteringMeter ) && (
                        <div className="no-meterId">
                            <div className="no-meterId-action">
                                <button onClick={() => handleIsRegisteringMeter(true)} >register meter</button>
                            </div>
                        </div>
                    )}
                </div>
        </div>
    )
}

export default WithTitle({component: DashboardPage, title: 'Dashboard' })