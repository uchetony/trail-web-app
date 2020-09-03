import React from 'react'
import SignInForm from '../ui/SignInForm';
import { NotificationManager } from 'react-notifications';
import { validateField } from '../../validations/validateField';
import { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../styles/SignInPage.scss'
import WithTitle from '../../hoc/WithTitle';

const INITIAL_STATE = {
    email: {
        value: '',
        errorMsg: '',
        validated: false,
        required: true
    },
    password: {
        value: '',
        errorMsg: '',
        validated: false,
        required: true
    },
    isSubmitting: false
}

const SignInPage = ({handleUpdateToken, location, authToken}) => {
    const [state, setstate] = useState({...INITIAL_STATE}); 
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let validationResult = validateField(name, value , state);
        setstate({...state, ...validationResult})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setstate({...state, isSubmitting: true});
        const userData = { email: state.email.value, password: state.password.value }
        
        try {
            const res = await axios.post( `${process.env.REACT_APP_ENDPOINT_BASE_URL}/api/auth`, userData);
            NotificationManager.success('Signed In Successfully', 'Successful!', 5000);
            // get token and store
            const {token} = res.data;

            // redirect user
            setstate({...INITIAL_STATE});
            handleUpdateToken(token);


        } catch (ex) {
            if(ex.response) {
                const {data} = ex.response
                setstate({...state, isSubmitting: false});
                NotificationManager.error(data, 'Error!', 5000);
            } else {
                setstate({...state, isSubmitting: false});
                NotificationManager.error('Could not connect to server', 'Error!', 5000);
            }
        }
    }

    // prevent authenticated users from accessing this route
    let { from } = location.state || { from: { pathname: "/app" } }
    if(authToken !== null){
        return <Redirect to={from.pathname} />
    }

    const { isSubmitting, email, password } = state;
    const isEnabled = email.validated && password.value.length > 3;

    return (
        <div className="signin-page-wrapper">
            <div className="signin-form-holder">
            <SignInForm 
                signinFormPageState={state}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isEnabled={isEnabled}
            />
            </div>
        </div>
    )
}

export default WithTitle({component: SignInPage, title: 'Signin'})