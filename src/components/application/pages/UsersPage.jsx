import React, { useEffect } from "react";

import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import WithTitle from "../../../hoc/WithTitle";

import auth from "../../../services/authService";

import { getStakeholderUsers } from "../../../services/userService";

import "../styles/UsersPage.scss";

const UsersPage = () => {
  const { _id: stakeholderId } = auth.getCurrentUser();

  const [customers, setcustomers] = React.useState(null);

  useEffect(() => {
    const getCompanyCustomers = async () => {
      try {
        const { data } = await getStakeholderUsers(stakeholderId);

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
        }
      }
    };
    getCompanyCustomers();
  }, [stakeholderId]);

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
