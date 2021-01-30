import React from "react";

import { Redirect } from "react-router-dom";

import auth from "../../../services/authService";

import SignInForm from "../ui/SignInForm";
import WithTitle from "../../../hoc/WithTitle";

import "../styles/SignInPage.scss";

const SignInPage = ({ location }) => {
  if (auth.getCurrentUser()) return <Redirect to="/app" />;

  return (
    <div className="signin-page-wrapper">
      <div className="signin-form-holder">
        <SignInForm location={location} />
      </div>
    </div>
  );
};

export default WithTitle({ component: SignInPage, title: "Signin" });
