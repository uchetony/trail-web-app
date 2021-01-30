import React from "react";

import Joi from "joi-browser";
import { NotificationManager } from "react-notifications";

import WithPopUp from "../../../hoc/WithPopUp";

import { getStakeholders } from "../../../services/stakeholderService";
import auth from "../../../services/authService";
import { setUserBillingData } from "../../../services/userService";

import Form from "../../../components/common/form";

import "../styles/RegisterMeter.scss";

const RegisterMeter = ({ handleIsOpenPopUp }) => {
  const registerMeterState = {
    data: { meterId: "", companyId: "" },
    errors: {},
  };

  const [companies, setCompanies] = React.useState([]);

  const registerMeterInputFields = [
    {
      name: "meterId",
      label: "Meter Id",
      icon: "tachometer-alt",
      placeholder: "Enter meter id",
    },
    {
      name: "companyId",
      options: companies,
      valueProp: "_id",
      textProp: "companyName",
      defaultText: "Select Company",
    },
  ];

  // validate each input field
  const registerMeterErrorSchema = {
    meterId: Joi.string().required().label("Meter Id"),
    companyId: Joi.string().required().label("Company"),
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

      handleIsOpenPopUp(null);
      window.location = "/app";
      NotificationManager.success(
        "Meter added successfully",
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
    <div className="register-meter-holder">
      <div className="register-meter-holder-top">
        <h3> Register new meter </h3>
        <small>{auth.getCurrentUser()._id}</small>
      </div>

      <Form
        errorSchema={registerMeterErrorSchema}
        doSubmit={doSubmit}
        state={registerMeterState}
        submitButton={submitButton}
        inputFields={registerMeterInputFields}
      />
    </div>
  );
};

export default WithPopUp({ component: RegisterMeter });
