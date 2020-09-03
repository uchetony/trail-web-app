import React from 'react';
import '../styles/TopNavbar.scss';
import {isMobile, isBrowser} from 'react-device-detect'
import {dashboardNavbar, billingNavbar, settingsNavbar, profileNavbar} from './DesktopNavbars'
import MobileNavbar from './MobileNavbar';

export default function TopNavbar({handleIsOpenMobileSidebar, location, url}) {
    
    const mapLocationToDesktopNavabar = [
        {path: `${url}/dashboard`, header: dashboardNavbar, className: "dashboard-navbar" },
        {path: `${url}/billing`, header: billingNavbar, className: "billing-navbar"},
        {path: `${url}/settings`, header: settingsNavbar, className: "settings-navbar"},
        {path: `${url}/profile`, header: profileNavbar, className: "profile-navbar"}
    ]

    return (
        <div className="top-navbar-wrapper">
            {isMobile && (
                <div className="top-navbar-holder-mobile">
                    <MobileNavbar handleIsOpenMobileSidebar={handleIsOpenMobileSidebar} />
                </div>
            )}

            {isBrowser && (
                <div className="top-navbar-holder-desktop">
                    {mapLocationToDesktopNavabar.map((el, index) => (
                        el.path === location.pathname && (
                            <div className={el.className} key={index}>
                                {el.header(index)}
                            </div>
                        )
                    ))}
                </div>  
            )}
        </div>
    )
}
