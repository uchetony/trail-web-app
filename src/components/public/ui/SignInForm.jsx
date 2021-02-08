import React from "react";

import { Link } from "react-router-dom";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";

import auth from "../../../services/authService";

import FormContainer from "../../common/FormContainer";

export default function SignInForm({ location }) {
  const signInFormState = { data: { email: "", password: "" } };

  const [formSubmitting, setFormSubmitting] = React.useState(false);

  // render input fields
  const signInFormFields = [
    { name: "email", label: "Email", icon: "envelope" },
    { name: "password", label: "Password", icon: "lock", type: "password" },
  ];

  const signInFormValidationSchema = {
    email: Yup.string().email().required("Required").label("Email"),
    password: Yup.string().required().label("Password"),
  };

  const submitButton = {
    label: "sign in",
    submittingText: "signing in",
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

      <FormContainer
        validationSchema={signInFormValidationSchema}
        doSubmit={doSubmit}
        state={signInFormState}
        submitButton={submitButton}
        formFields={signInFormFields}
        formSubmitting={formSubmitting}
      />

      <small className="no-account">
        Don't have an account? <Link to="/signup">Register now</Link>{" "}
      </small>
    </div>
  );
}
