import React from 'react'
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/SignOutPage.scss';
import WithTitle from '../../../hoc/WithTitle';
import { useCookies } from 'react-cookie';


const SignOutPage = ({authToken}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

    // delete token and redirect user on componentDidMount
    useEffect(() => {
        removeCookie('authToken');
        window.location = "/"
    }, [])
    
    // prevent visitors from accessing this page
    if(authToken === null) {
        return <Redirect to="/" />
    }

    return (
        <div className="signout-wrapper">
            <div className="signout-container">
                <span><FontAwesomeIcon icon="circle-notch" pulse /></span>
                <span>signing out</span>
            </div>
        </div>
    )
}

export default WithTitle({component: SignOutPage, title: 'Sign out'})
