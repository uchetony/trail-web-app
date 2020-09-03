import React, { useState } from 'react'
import SignUpForm from '../ui/SignUpForm';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { validateField } from '../../validations/validateField';
import { Redirect } from 'react-router-dom';
import '../styles/SignUpPage.scss';
import WithTitle from '../../hoc/WithTitle';

const INITIAL_STATE = {
    fullName: { value: '', errorMsg: '', validated: false, required: true },
    phoneNumber: { value: '', errorMsg: '', validated: false, required: true },
    address: { value: '', errorMsg: '', validated: false, required: true },
    email: { value: '', errorMsg: '', validated: false, required: true },
    password: { value: '', errorMsg: '', validated: false, required: true },
    confirmPassword: { value: '', errorMsg: '', validated: false, required: true },
    isSubmitting: false
}

const SignUpPage = ({handleUpdateToken, authToken}) => {
    const [state, setstate] = useState({...INITIAL_STATE});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let validationResult = validateField(name, value, state);
        setstate({...state, ...validationResult})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setstate({...state, isSubmitting: true});

        const userData = {
            fullName: state.fullName.value,
            email: state.email.value,
            password: state.password.value,
            address: state.address.value,
            phoneNumber: state.phoneNumber.value,
            role: "customer"
        }
        
        try {
            const response = await axios.post( `${process.env.REACT_APP_ENDPOINT_BASE_URL}/api/users`, userData);
            NotificationManager.success('Signed In Successfully', 'Successful!', 5000);
            // get token and store
            const {token} = response.data;
            
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

    const {fullName, email, password, confirmPassword, phoneNumber, address, isSubmitting} = state
    const isEnabled = fullName.validated && 
                        email.validated && 
                        password.validated && 
                        confirmPassword.validated &&
                        address.validated &&
                        phoneNumber.validated;

    // prevent authenticated users from accessing this route
    if(authToken !== null){
        return <Redirect to="/app" />
    }
    
    return (
        <div className="signup-page-wrapper">
            <div className="signup-form-holder">
                <SignUpForm 
                    signUpFormPageState={state}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    isEnabled={isEnabled}
                />
            </div>
        </div>
    )
}

export default WithTitle({component: SignUpPage, title: 'Signup'})
