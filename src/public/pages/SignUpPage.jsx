import React from "react";

import { Redirect } from "react-router-dom";

import auth from "../../services/authService";

import SignUpForm from "../ui/SignUpForm";
import WithTitle from "../../hoc/WithTitle";

import "../styles/SignUpPage.scss";

const SignUpPage = ({ location }) => {
  if (auth.getCurrentUser()) return <Redirect to="/app" />;

  return (
    <div className="signup-page-wrapper">
      <div className="signup-form-holder">
        <SignUpForm location={location} />
      </div>
    </div>
  );
};

export default WithTitle({ component: SignUpPage, title: "Signup" });
