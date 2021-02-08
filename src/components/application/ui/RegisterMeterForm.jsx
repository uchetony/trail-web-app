import React from "react";

import * as Yup from "yup";
import { NotificationManager } from "react-notifications";

import WithPopUp from "../../../hoc/WithPopUp";

import { getStakeholders } from "../../../services/stakeholderService";
import auth from "../../../services/authService";
import { setUserBillingData } from "../../../services/userService";

import FormContainer from "../../common/FormContainer";

import "../styles/RegisterMeterForm.scss";

const RegisterMeterForm = ({ handleIsOpenPopUp }) => {
  const registerMeterFormState = {
    data: { meterId: "", companyId: "" },
    errors: {},
  };

  const [formSubmitting, setFormSubmitting] = React.useState(false);

  const [companies, setCompanies] = React.useState([]);

  const registerMeterFormFields = [
    {
      name: "meterId",
      label: "Meter Id",
      icon: "tachometer-alt",
      placeholder: "Enter meter id",
    },
    {
      control: "select",
      name: "companyId",
      options: companies,
      valueProp: "_id",
      textProp: "companyName",
      defaultText: "Select Company",
    },
  ];

  const rgsMeterValidationSchema = {
    meterId: Yup.string().required("Please enter your meter id"),
    companyId: Yup.string().required("Please select a company"),
  };

  const submitButton = {
    label: "register meter",
    isSubmitting: null,
    submittingText: "registering meter",
  };

  const populateDropdown = async () => {
    const { data: companies } = await getStakeholders();
    setCompanies([...companies]);
  };

  React.useEffect(() => {
    populateDropdown();
  }, []);

  const doSubmit = async (meterDetails) => {
    setFormSubmitting(true);
    const userId = auth.getCurrentUser()._id;
    const { companyName } = companies.find(
      (com) => com._id === meterDetails.companyId
    );
    const billingData = {
      userId,
      meterId: meterDetails.meterId,
      companyId: meterDetails.companyId,
      companyName,
    };

    try {
      const response = await setUserBillingData(userId, billingData);
      auth.signInWithJwt(response.headers["x-auth-token"]);
      setFormSubmitting(false);

      handleIsOpenPopUp(null);
      window.location = "/app";
      NotificationManager.success(
        "Meter added successfully",
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
    <div className="register-meter-holder">
      <div className="register-meter-holder-top">
        <h3> Register new meter </h3>
        <small>{auth.getCurrentUser()._id}</small>
      </div>

      <div className="form">
        <FormContainer
          validationSchema={rgsMeterValidationSchema}
          doSubmit={doSubmit}
          state={registerMeterFormState}
          submitButton={submitButton}
          formFields={registerMeterFormFields}
          formSubmitting={formSubmitting}
        />
      </div>
    </div>
  );
};

export default WithPopUp({ component: RegisterMeterForm });
