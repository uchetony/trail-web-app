import React from "react";

// Routes
import { Route, Switch, Redirect } from "react-router-dom";
import SignInPage from "./components/public/pages/SignInPage";
import SignUpPage from "./components/public/pages/SignUpPage";
import ApplicationPage from "./components/application/ApplicationPage";
import SignOutPage from "./components/application/pages/SignOutPage";
import VerifyEmailPage from "./components/application/pages/VerifyEmailPage";
import NotFoundPage from "./components/public/pages/NotFoundPage";
import LandingPage from "./components/public/pages/LandingPage";
import ProtectedRoute from "./components/common/protectedRoute";

// notifications
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import "./App.css";

function App() {
  return (
    <div>
      <NotificationContainer />
      <Switch>
        <ProtectedRoute path="/app" component={ApplicationPage} />

        <Route path="/signin" render={(props) => <SignInPage {...props} />} />
        <Route path="/signup" render={(props) => <SignUpPage {...props} />} />
        <Route path="/signout" render={(props) => <SignOutPage {...props} />} />

        <ProtectedRoute path="/verify" component={VerifyEmailPage} />

        <Route path="/404" component={NotFoundPage} />
        <Route exact path="/" component={LandingPage} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
