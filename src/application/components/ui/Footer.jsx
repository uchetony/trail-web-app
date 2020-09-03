import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Footer.scss';

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="footer-holder">
                <small> 
                    Made with <span className="footer-heart-icon"><FontAwesomeIcon icon="heart" /> </span>
                    by team Trail 
                </small>
                <small>
                    &copy; 2020 Eko smart meter hackathon, Eko innovation center
                </small>
            </div>
        </div>
    )
}
