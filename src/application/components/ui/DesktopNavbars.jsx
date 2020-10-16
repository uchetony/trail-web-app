import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const dashboardNavbar = () => {
    return (
        <React.Fragment>
            <h3>Dashboard</h3>
            <div className="left-side">
                <span> <FontAwesomeIcon icon="calendar" /> </span>
                <span> {new Date().toDateString()} </span>
            </div>
        </React.Fragment>
    )
}

export const billingNavbar = () => {
    return (
        <React.Fragment>
            <h3>Energy billing</h3>
        </React.Fragment>
    )
}

export const settingsNavbar = () => {
    return (
        <React.Fragment>
            <h3>Settings</h3>
        </React.Fragment>
    )
}

export const profileNavbar = () => {
    return (
        <React.Fragment>
            <h3>Profile</h3>
        </React.Fragment>
    )
}

export const usersNavbar = () => {
    return (
        <React.Fragment>
            <h3>Customers</h3>
        </React.Fragment>
    )
}

export const devicesNavbar = () => {
    return (
        <React.Fragment>
            <h3>Devices</h3>
        </React.Fragment>
    )
}