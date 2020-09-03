import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/LeftNavbar.scss';
import userDp from '../../../static/images/blank-profile-picture.png'
import { isMobile, isBrowser } from 'react-device-detect';
import {Link} from 'react-router-dom';

export default function LeftNavbar({userDetails, url, location, isOpenMobileSidebar}) {
    const {pathname} = location;

    const navigation = [
        { link: "dashboard", name: "Dashboard", icon: "th-large"},
        { link: "profile", name: "My account", icon: "user"},
        { link: "billing", name: "Energy billing", icon: "bolt"},
        { link: "settings", name: "Settings", icon: "cog"},
        { link: "signout", name: "Sign Out", icon: "sign-out-alt"}
    ]

    return (
        <React.Fragment>
            {((isMobile && isOpenMobileSidebar !== null) || isBrowser) && (
                <div className={isMobile ? (isOpenMobileSidebar ? "left-navbar" : "left-navbar-closed") : "left-navbar"}>
                    <div className="left-navbar-header">
                        <h1>Trail</h1>
                        <span className="left-navbar-header-image">
                            <img src={userDp} alt="user dp"/>
                        </span>
        
                        { userDetails !== null && (
                            <div className="profile-details">
                                <h3>{userDetails.fullName} </h3>
                                <p>{userDetails.role}</p>
                            </div>
                        )}
                    </div>
        
                    <div className="left-navbar-links">
                        {
                            navigation.map((nav, index) => 
                                <li key={index}>
                                    <Link to={`${nav.link !== "signout" ? url : ''}/${nav.link}` }>
                                        <div className={pathname === `${url}/${nav.link}` ? 
                                            "left-navbar-icon-active" : "left-navbar-icon"}
                                        >
                                            <span><FontAwesomeIcon icon={nav.icon} /></span>
                                            <p> {nav.name} </p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    </div>
                </div>
            ) }
        </React.Fragment>
    )
}
