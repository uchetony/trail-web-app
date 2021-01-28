import React from "react";

import { Redirect, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import auth from "../../../services/authService";
import { verifyUserEmail } from "../../../services/userService";

import WithTitle from "../../../hoc/WithTitle";

import "../styles/VerifyEmailPage.scss";

const VerifyEmailPage = ({ history }) => {
  // custom hook to get query params
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const email = query.get("email");

  const [isVerifying, setisVerifying] = React.useState(false);

  const userDetails = auth.getCurrentUser();

  const handleVerifyAccount = async () => {
    setisVerifying(true);
    try {
      const response = await verifyUserEmail(userDetails._id, email);
      auth.signInWithJwt(response.headers["x-auth-token"]);
      history.replace("/app");

      NotificationManager.success(
        "Email verified Successfully",
        "Successful!",
        5000
      );
    } catch (ex) {
      setisVerifying(false);
      const { data } = ex.response;
      NotificationManager.error(data, "Error!", 5000);
    }
  };

  // prevent verified users from accessing this route
  if (userDetails && userDetails.isVerifiedEmail) {
    return <Redirect to="/app" />;
  }

  return (
    <div className="verify-wrapper">
      <div className="verify-button-container">
        {isVerifying ? (
          <React.Fragment>
            <span>
              <FontAwesomeIcon icon="circle-notch" pulse />
            </span>
            <span>Verifying email</span>
          </React.Fragment>
        ) : (
          <button onClick={handleVerifyAccount}>Activate my account</button>
        )}
      </div>
    </div>
  );
};

export default WithTitle({ component: VerifyEmailPage, title: "Verify email" });
