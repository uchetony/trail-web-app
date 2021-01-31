import React from "react";

import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { NotificationManager } from "react-notifications";

import auth from "../../../services/authService";

import Form from "../../common/form";

export default function SignInForm({ location }) {
  const signInFormState = { data: { email: "", password: "" }, errors: {} };

  const [formSubmitting, setFormSubmitting] = React.useState(false);

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
    setFormSubmitting(true);
    try {
      const { email, password } = userLoginDetails;
      await auth.signIn(email, password);
      setFormSubmitting(false);

      const { state } = location;
      window.location = state ? state.from.pathname : "/app";
      NotificationManager.success(
        "Signed In Successfully",
        "Successful!",
        5000
      );
    } catch (ex) {
      setFormSubmitting(false);
      if (ex.response) {
        const { data } = ex.response;
        NotificationManager.error(data, "Error!", 5000);
      }
    }
  };

  return (
    <div className="form">
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
        formSubmitting={formSubmitting}
      />

      <small className="no-account">
        Don't have an account? <Link to="/signup">Register now</Link>{" "}
      </small>
    </div>
  );
}
