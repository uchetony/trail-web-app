import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import { isMobile } from "react-device-detect";

import auth from "../../services/authService";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import LeftNavbar from "./ui/LeftNavbar";
import BillingPage from "./pages/BillingPage";
import TopNavbar from "./ui/TopNavbar";
import Footer from "./ui/Footer";
import UsersPage from "./pages/UsersPage";
import DevicesPage from "./pages/DevicesPage";

import "./Application.scss";

const ApplicationPage = ({ match, location }) => {
  const { path, url } = match;

  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = React.useState(null);
  const handleIsOpenMobileSidebar = (value) => {
    setIsOpenMobileSidebar(value);
  };

  const { role } = auth.getCurrentUser();

  return (
    <div className="application-wrapper">
      <div className={isMobile ? "mobile" : "desktop"}>
        <div className={isMobile ? "" : "left"}>
          <LeftNavbar
            url={url}
            location={location}
            isOpenMobileSidebar={isOpenMobileSidebar}
          />
        </div>

        <div className={isMobile ? "" : "right"}>
          <TopNavbar
            url={url}
            handleIsOpenMobileSidebar={handleIsOpenMobileSidebar}
            location={location}
          />

          <div className="content">
            <Switch>
              <Route
                exact
                path={path}
                render={() => <Redirect to={`${path}/dashboard`} />}
              />
              <Route
                path={`${path}/dashboard`}
                render={() => <DashboardPage />}
              />
              <Route path={`${path}/profile`} render={() => <ProfilePage />} />
              <Route
                path={`${path}/settings`}
                render={() => <SettingsPage />}
              />
              {role === "customer" && (
                <Route
                  path={`${path}/billing`}
                  render={() => <BillingPage />}
                />
              )}
              {role === "stakeholder" && (
                <Route path={`${path}/users`} render={() => <UsersPage />} />
              )}
              {role === "stakeholder" && (
                <Route
                  path={`${path}/devices`}
                  render={() => <DevicesPage />}
                />
              )}
              <Route path="*" render={() => <Redirect to="/404" />} />
            </Switch>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
