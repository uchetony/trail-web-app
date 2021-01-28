import React from "react";

import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { NotificationManager } from "react-notifications";

import auth from "../../services/authService";
import { registerUser } from "../../services/userService";

import Form from "../../components/common/form";

export default function SignUpForm() {
  const signUpFormState = {
    data: {
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      fullName: "",
      confirmPassword: "",
    },
    errors: {},
  };

  // render input fields
  const signUpFormInputFields = [
    {
      name: "fullName",
      label: "Full Name",
      icon: "user-circle",
      placeholder: "Enter full name",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      icon: "phone-alt",
      placeholder: "Enter full name",
      type: "tel",
    },
    {
      name: "address",
      label: "Home Address",
      icon: "address-card",
      placeholder: "Your Address",
    },
    {
      name: "email",
      label: "Email",
      icon: "envelope",
      placeholder: "Enter valid email",
    },
    {
      name: "password",
      label: "Password",
      icon: "lock",
      placeholder: "Enter your password",
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "ConfirmPassword",
      icon: "lock",
      placeholder: "Confirm your password",
      type: "password",
    },
  ];

  // validate each input field
  const signUpFormErrorSchema = {
    fullName: Joi.string().required().label("Full Name"),
    phoneNumber: Joi.number().required().label("Phone Number"),
    address: Joi.string().required().label("Address"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string().required().label("Confirm Password"),
  };

  const submitButton = {
    label: "sign up",
    isSubmitting: null,
    submittingText: "submitting",
  };

  const doSubmit = async (userSignUpDetails) => {
    const userData = {
      fullName: userSignUpDetails.fullName,
      email: userSignUpDetails.email,
      password: userSignUpDetails.password,
      address: userSignUpDetails.address,
      phoneNumber: userSignUpDetails.phoneNumber,
      role: "customer",
    };
    try {
      const response = await registerUser(userData);
      auth.signInWithJwt(response.headers["x-auth-token"]);
      window.location = "/app";
      NotificationManager.success(
        "Signed Up Successfully",
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
        <h1>Start metering now!</h1>
      </div>

      <Form
        errorSchema={signUpFormErrorSchema}
        doSubmit={doSubmit}
        state={signUpFormState}
        submitButton={submitButton}
        inputFields={signUpFormInputFields}
      />

      <small className="no-account">
        Already have an account? <Link to="/signin">Signin now</Link>{" "}
      </small>
    </div>
  );
}
