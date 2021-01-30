import React from "react";

import { Link } from "react-router-dom";

import auth from "../../../services/authService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userDp from "../../../assets/images/blank-profile-picture.png";
import { isMobile, isBrowser } from "react-device-detect";

import "../styles/LeftNavbar.scss";

export default function LeftNavbar({ url, location, isOpenMobileSidebar }) {
  const { pathname } = location;
  const userDetails = auth.getCurrentUser();
  const { role } = userDetails;

  const navigation = [
    {
      link: "dashboard",
      name: "Dashboard",
      icon: "th-large",
      role: ["customer", "stakeholder"],
    },
    {
      link: "profile",
      name: "My account",
      icon: "user",
      role: ["customer", "stakeholder"],
    },

    {
      link: "users",
      name: "Manage users",
      icon: "users",
      role: ["stakeholder"],
    },
    {
      link: "devices",
      name: "Devices",
      icon: "tachometer-alt",
      role: ["stakeholder"],
    },

    {
      link: "billing",
      name: "Energy billing",
      icon: "bolt",
      role: ["customer"],
    },

    {
      link: "settings",
      name: "Settings",
      icon: "cog",
      role: ["customer", "stakeholder"],
    },
    {
      link: "signout",
      name: "Sign Out",
      icon: "sign-out-alt",
      role: ["customer", "stakeholder"],
    },
  ];

  return (
    <React.Fragment>
      {((isMobile && isOpenMobileSidebar !== null) || isBrowser) && (
        <div
          className={
            isMobile
              ? isOpenMobileSidebar
                ? "left-navbar"
                : "left-navbar-closed"
              : "left-navbar"
          }
        >
          <div className="left-navbar-header">
            <h1>Trail</h1>
            <span className="left-navbar-header-image">
              <img src={userDp} alt="user dp" />
            </span>

            {userDetails !== null && (
              <div className="profile-details">
                {role === "customer" && <h3>{userDetails.fullName} </h3>}
                {role === "stakeholder" && <h3>{userDetails.companyName} </h3>}
                <p>{userDetails.role}</p>
              </div>
            )}
          </div>

          <div className="left-navbar-links">
            {navigation.map((nav, index) => (
              <li key={index}>
                {nav.role.includes(role) && (
                  <Link to={`${nav.link !== "signout" ? url : ""}/${nav.link}`}>
                    <div
                      className={
                        pathname === `${url}/${nav.link}`
                          ? "left-navbar-icon-active"
                          : "left-navbar-icon"
                      }
                    >
                      <span>
                        <FontAwesomeIcon icon={nav.icon} />
                      </span>
                      <p> {nav.name} </p>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
