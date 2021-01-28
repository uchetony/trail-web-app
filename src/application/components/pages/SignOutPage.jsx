import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import auth from "../../../services/authService";

import WithTitle from "../../../hoc/WithTitle";

import "../styles/SignOutPage.scss";

const SignOutPage = () => {
  React.useEffect(() => {
    setTimeout(() => {
      auth.signOut();
      window.location = "/";
    }, 3000);
  }, []);

  return (
    <div className="signout-wrapper">
      <div className="signout-container">
        <span>
          <FontAwesomeIcon icon="circle-notch" pulse />
        </span>
        <span>signing out</span>
      </div>
    </div>
  );
};

export default WithTitle({ component: SignOutPage, title: "Sign out" });
