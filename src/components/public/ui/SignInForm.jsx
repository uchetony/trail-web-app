import React from "react";

import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { NotificationManager } from "react-notifications";

import auth from "../../../services/authService";

import Form from "../../common/form";

export default function SignInForm({ location }) {
  const signInFormState = { data: { email: "", password: "" }, errors: {} };

  // render input fields
  const signInFormInputFields = [
    { name: "email", label: "Email", icon: "envelope" },
    { name: "password", label: "Password", icon: "lock", type: "password" },
  ];

  // validate each input field
  const signInFormErrorSchema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const submitButton = {
    label: "sign in",
    isSubmitting: null,
    submittingText: "submitting",
  };

  const doSubmit = async (userLoginDetails) => {
    try {
      const { email, password } = userLoginDetails;
      await auth.signIn(email, password);

      const { state } = location;
      window.location = state ? state.from.pathname : "/app";
      NotificationManager.success(
        "Signed In Successfully",
        "Successful!",
        5000
      );
    } catch (ex) {
      if (ex.response) {
        const { data } = ex.response;
        NotificationManager.error(data, "Error!", 5000);
      }
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Login</h1>
      </div>
      <div className="sub-header">
        <small>to your smart meter account</small>
      </div>

      <Form
        errorSchema={signInFormErrorSchema}
        doSubmit={doSubmit}
        state={signInFormState}
        submitButton={submitButton}
        inputFields={signInFormInputFields}
      />

      <small className="no-account">
        Don't have an account? <Link to="/signup">Register now</Link>{" "}
      </small>
    </div>
  );
}
