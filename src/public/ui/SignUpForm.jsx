import React from 'react'
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import { Link } from 'react-router-dom';

export default function SignUpForm(props) {
    const {signUpFormPageState, handleInputChange, 
            isEnabled, handleSubmit, isSubmitting, 
            } = props;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="header"><h1>Start metering now!</h1></div>
                <FormInput 
                    label="Full Name" 
                    type="text" 
                    name="fullName" 
                    icon="user-circle"
                    placeholder="Enter full name"
                    value={signUpFormPageState.fullName.value} 
                    handleInputChange={handleInputChange} 
                    errorMsg={signUpFormPageState.fullName.errorMsg}
                    isRequired={signUpFormPageState.fullName.required} />
                <FormInput 
                    label="Phone number" 
                    type="tel" 
                    name="phoneNumber" 
                    icon="phone-alt"
                    placeholder="Enter full name"
                    value={signUpFormPageState.phoneNumber.value} 
                    handleInputChange={handleInputChange} 
                    errorMsg={signUpFormPageState.phoneNumber.errorMsg}
                    isRequired={signUpFormPageState.phoneNumber.required} /> 
                <FormInput 
                    label="Home Address" 
                    type="text" 
                    name="address" 
                    icon="address-card"
                    placeholder="Your Address"
                    value={signUpFormPageState.address.value} 
                    handleInputChange={handleInputChange} 
                    errorMsg={signUpFormPageState.address.errorMsg}
                    isRequired={signUpFormPageState.address.required} /> 
                <FormInput 
                    label="Email" 
                    type="email" 
                    name="email" 
                    icon="envelope"
                    placeholder="Enter valid email"
                    value={signUpFormPageState.email.value} 
                    handleInputChange={handleInputChange} 
                    errorMsg={signUpFormPageState.email.errorMsg}
                    isRequired={signUpFormPageState.email.required} />
                <FormInput 
                    label="Password" 
                    type="password" 
                    name="password" 
                    icon="lock"
                    placeholder="Enter your password"
                    value={signUpFormPageState.password.value} 
                    handleInputChange={handleInputChange} 
                    errorMsg={signUpFormPageState.password.errorMsg}
                    isRequired={signUpFormPageState.password.required} />
                <FormInput 
                    label="Confirm password" 
                    type="password" 
                    name="confirmPassword" 
                    icon="lock"
                    placeholder="Confirm your password"
                    value={signUpFormPageState.confirmPassword.value} 
                    handleInputChange={handleInputChange} 
                    errorMsg={signUpFormPageState.confirmPassword.errorMsg}
                    isRequired={signUpFormPageState.confirmPassword.required} />
                
                <SubmitButton 
                    disabled={!isEnabled} 
                    type="submit" 
                    label="sign up" 
                    isSubmitting={isSubmitting}
                    submittingText="submitting"
                />

                <small className="no-account">Already have an account? <Link to="/signin">Signin now</Link> </small>
            </form>
        </div>
    )
}
