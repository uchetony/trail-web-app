import React from 'react'
import {Link} from 'react-router-dom';

import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

export default function SignInForm(props) {
    const {signinFormPageState, handleInputChange, isEnabled, handleSubmit, isSubmitting } = props;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="header"><h1>Login</h1></div>
                <div className="sub-header"><small>to your smart meter account</small></div>

                <FormInput 
                    label="Email" 
                    type="email" 
                    name="email" 
                    icon="envelope"
                    placeholder="Enter valid email"
                    value={signinFormPageState.email.value} 
                    handleInputChange={handleInputChange} 
                    errorMsg={signinFormPageState.email.errorMsg}
                    isRequired={signinFormPageState.email.required} />
                <FormInput 
                    label="Password" 
                    type="password" 
                    name="password" 
                    icon="lock"
                    placeholder="Enter your password"
                    value={signinFormPageState.password.value} 
                    handleInputChange={handleInputChange} 
                    isRequired={signinFormPageState.password.required} />
                <SubmitButton 
                    disabled={!isEnabled} 
                    type="submit" 
                    label="sign in" 
                    isSubmitting={isSubmitting}
                    submittingText="submitting"
                />
                
                <small className="no-account">Don't have an account? <Link to="/signup">Register now</Link> </small>

            </form>
        </div>
    )
}
