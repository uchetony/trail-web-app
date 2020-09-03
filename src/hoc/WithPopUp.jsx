import React from 'react'
import './styles/PopUp.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WithPopUp = ({ component: Component}) => props => {
    const closePopup = () => {handleIsOpenPopUp(null, {})};

    const {handleIsOpenPopUp, isOpenPopUp} = props;

    return (
        <React.Fragment>
            {isOpenPopUp !== null && 
                <div className={isOpenPopUp ? "popup-wrapper" : "popup-wrapper-close"}>
                    <div className="popup-holder">
                        <span className="close-popup" onClick={closePopup}><FontAwesomeIcon icon="times-circle" /></span>
                        <Component {...props} />
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default WithPopUp
