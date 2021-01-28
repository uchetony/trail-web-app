import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Footer.scss";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-holder">
        <small>
          Made with
          <span className="footer-heart-icon">
            <FontAwesomeIcon icon="heart" />
          </span>
          by
          <a
            className="footer-link"
            href="https://www.linkedin.com/in/anthony-uche"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthony Uche
          </a>
        </small>
        <small>&copy; Trail, 2020 - {new Date().getFullYear()}</small>
      </div>
    </div>
  );
}
