import React, { useEffect } from "react";

import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import WithTitle from "../../../hoc/WithTitle";

import auth from "../../../services/authService";

import axios from "axios";

import "../styles/UsersPage.scss";

const UsersPage = ({ authToken }) => {
  const userDetails = auth.getCurrentUser();

  const [customers, setcustomers] = React.useState(null);

  const getCompanyCustomers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_BASE_URL}/api/users/stakeholders/${userDetails._id}`,
        {
          headers: {
            "x-auth-token": authToken,
            "content-type": "application/json",
          },
        }
      );
      const { data } = response;
      data.length &&
        NotificationManager.success(
          "Customers retrieved sucessfully",
          "Successful!",
          5000
        );
      setcustomers(data);
    } catch (ex) {
      if (ex.response) {
        const { data } = ex.response;
        setcustomers([]);
        NotificationManager.error(data, "Error!", 5000);
      } else {
        setcustomers([]);
        NotificationManager.error(
          "Could not connect to server",
          "Error!",
          5000
        );
      }
    }
  };

  useEffect(() => {
    getCompanyCustomers();
  }, []);
  console.log(customers);
  return (
    <div className="users-page-wrapper">
      <div className="users-page-holder">
        {customers && !customers.length && (
          <div className="central-data">
            <button>Add User</button>
          </div>
        )}

        {customers === null && (
          <div className="central-data">
            <FontAwesomeIcon icon="spinner" pulse />
          </div>
        )}

        {customers &&
          customers.length > 0 &&
          customers.map((customer, index) => (
            <div key={index} className="customer-card">
              <h3> {customer.fullName} </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WithTitle({ component: UsersPage, title: "manage users" });
