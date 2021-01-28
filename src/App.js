import React from "react";
import "./App.css";

// Routes
import { Route, Switch, Redirect } from "react-router-dom";
import SignInPage from "./public/pages/SignInPage";
import SignUpPage from "./public/pages/SignUpPage";
import ApplicationPage from "./application/ApplicationPage";
import SignOutPage from "./application/components/pages/SignOutPage";
import VerifyEmailPage from "./application/components/pages/VerifyEmailPage";

// notifications
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

// cookies
import NotFoundPage from "./public/pages/NotFoundPage";
import LandingPage from "./public/pages/LandinPage";
import ProtectedRoute from "./components/common/protectedRoute";

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
