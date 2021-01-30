import React from "react";

import auth from "../../../services/authService";

import WithTitle from "../../../hoc/WithTitle";
import CustomerDashboard from "../ui/CustomerDashboard";
import StakeholderDashboard from "../ui/StakeholderDashboard";

import "../styles/DashboardPage.scss";

const DashboardPage = ({ handleUpdateToken }) => {
  const { role } = auth.getCurrentUser();

  return (
    <div className="dashboard-page-wrapper">
      {role === "customer" && (
        <CustomerDashboard handleUpdateToken={handleUpdateToken} />
      )}
      {role === "stakeholder" && <StakeholderDashboard />}
    </div>
  );
};

export default WithTitle({ component: DashboardPage, title: "Dashboard" });
