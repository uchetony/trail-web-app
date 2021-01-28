import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/LandingPage.scss";

export default function LandingPage({ history }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      history.replace({ pathname: "/app" });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <div className="logo-holder">
          <span>Smart</span>
          <span>
            <FontAwesomeIcon icon="tachometer-alt" className="icon" />
            eter
          </span>
        </div>

        <div className="team-name-holder">
          <span>From</span>
          <span>Trail</span>
        </div>

        <div className="curves">
          <span></span>
        </div>
      </div>
    </div>
  );
}
