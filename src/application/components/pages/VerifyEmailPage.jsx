import React from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import '../styles/VerifyEmailPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WithTitle from '../../../hoc/WithTitle';

const VerifyEmailPage = ({authToken, handleUpdateToken, history}) => {

    // custom hook to get query params
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    } 

    let query = useQuery();
    const email = query.get('email');

    const [isVerifying, setisVerifying] = useState(false);

    const jwtDetails = authToken === null ? {} : jwtDecode(authToken);

    const handleVerifyAccount = async () => {
        setisVerifying(true);
        const userData = { email }
        try {
            const res = await axios.post( `${process.env.REACT_APP_ENDPOINT_BASE_URL}/api/users/${jwtDetails._id}/verify/email`, userData);
            NotificationManager.success('Email verified Successfully', 'Successful!', 5000);
            // get token and update
            const {token} = res.data;
            setisVerifying(false);
            handleUpdateToken(token);
        } catch (ex) {
            if(ex.response) {
                const {data} = ex.response
                setisVerifying(false);
                NotificationManager.error(data, 'Error!', 5000);
            } else {
                setisVerifying(false);
                NotificationManager.error('Could not connect to server', 'Error!', 5000);
            }
        }

    }

    // prevent verified users from accessing this route
    // if(authToken !== null && jwtDetails.isVerifiedEmail){
    //     return history.goBack()
    // }

    // prevent unauthorized users from accessing this route
    if(authToken === null) {
        return <Redirect to="/signin" />
    }

    return (
        <div className="verify-wrapper">
            <div className="verify-button-container">
                {isVerifying ? 
                (
                    <React.Fragment>
                        <span><FontAwesomeIcon icon="circle-notch" pulse /></span>
                        <span>Verifying email</span>    
                    </React.Fragment>
                ) : 
                    <button onClick={handleVerifyAccount} >Activate my account</button>
                }
            </div>
        </div>
    )
}

export default WithTitle({component: VerifyEmailPage, title: 'Verify email'})
