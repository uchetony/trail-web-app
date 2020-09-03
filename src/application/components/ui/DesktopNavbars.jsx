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
            this is the settings navbar
        </React.Fragment>
    )
}

export const profileNavbar = () => {
    return (
        <React.Fragment>
            this is the profile navbar
        </React.Fragment>
    )
}