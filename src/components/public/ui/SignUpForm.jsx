import React from "react";

import { Link } from "react-router-dom";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";

import auth from "../../../services/authService";
import { registerUser } from "../../../services/userService";

import Formcontainer from "../../common/FormContainer";

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
  };

  const [formSubmitting, setFormSubmitting] = React.useState(false);

  // render input fields
  const signUpFormFields = [
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

  const signUpFormValidationSchema = {
    fullName: Yup.string()
      .min(2)
      .matches(/(\w+\s{1}\w+){1}/, "Incorrect Entry e.g John Doe")
      .required()
      .label("Full Name"),
    phoneNumber: Yup.string()
      .matches(
        /^(?:0(?:[7-9][0-5])[0-9]{8})$/,
        "Invalid Nigerian phone Number. Must be exactly 11 digits and start with 070, 080, 090 etc."
      )
      .required()
      .label("Phone Number"),
    address: Yup.string().required().label("Address"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/,
        "password should not be less than 6 characters, must contain atleast one uppercase, one number and one special character"
      )
      .required()
      .label("Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Paaswords do not match")
      .required("Please confirm your password"),
  };

  const submitButton = {
    label: "sign up",
    submittingText: "signing up",
  };

  const doSubmit = async (userSignUpDetails) => {
    setFormSubmitting(true);
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
      setFormSubmitting(false);

      window.location = "/app";
      NotificationManager.success(
        "Signed Up Successfully",
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
        <h1>Start metering now!</h1>
      </div>

      <Formcontainer
        validationSchema={signUpFormValidationSchema}
        doSubmit={doSubmit}
        state={signUpFormState}
        submitButton={submitButton}
        formFields={signUpFormFields}
        formSubmitting={formSubmitting}
      />

      <small className="no-account">
        Already have an account? <Link to="/signin">Signin now</Link>{" "}
      </small>
    </div>
  );
}
