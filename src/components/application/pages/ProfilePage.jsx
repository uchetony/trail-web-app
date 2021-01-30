import React from "react";

import { Link } from "react-router-dom";

import auth from "../../../services/authService";

import userDp from "../../../assets/images/blank-profile-picture.png";
import WithTitle from "../../../hoc/WithTitle";

import "../styles/ProfilePage.scss";

const ProfilePage = () => {
  const userDetails = auth.getCurrentUser();

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-header">
        <div className="profile-page-header-image">
          <img src={userDp} alt="user dp" />
        </div>
        <Link to="/app/edit-profile" className="edit-profile-button">
          Edit profile
        </Link>
      </div>

      <div className="profile-page-holder">
        <div className="profile-detail">
          <p>{userDetails.role === "customer" ? "Full Name:" : "Company"} </p>
          <small>
            {userDetails.role === "customer"
              ? userDetails.fullName
              : userDetails.companyName}
          </small>
        </div>
        <div className="profile-detail">
          <p>Email:</p>
          <small>{userDetails.email}</small>
        </div>
        <div className="profile-detail">
          <p>Role:</p>
          <small>{userDetails.role}</small>
        </div>
        <div className="profile-detail">
          <p>Address:</p>
          <small>{userDetails.address}</small>
        </div>
        <div className="profile-detail">
          <p>Tel:</p>
          <small>{userDetails.phoneNumber}</small>
        </div>
      </div>
    </div>
  );
};

export default WithTitle({ component: ProfilePage, title: "Profile" });
