/* eslint-disable */

// name field validator
const nameFieldValidator = (fieldValue) => {
    let response = {
        errorMsg: "",
        validated: true
    }
    // check to make sure the field input is greater than 2
    if(fieldValue.length < 2) {
        response.errorMsg = "This field should not be less than 2 characters"
        response.validated = false
    } 
    if (fieldValue.length >= 2) {
        const regExp = /(\w+\s{1}\w+){1}/
        if (!regExp.test(fieldValue)) {
            response.errorMsg = "Incorrect Entry e.g John Doe"
            response.validated = false
        }
    }
    return response;
}

// address field validator
const addressFieldValidator = (fieldValue) => {
    let response = {
        errorMsg: "",
        validated: true,
    }
    if (fieldValue.length < 10) {
        response.errorMsg = "Enter a valid address"
        response.validated = false
    }
    return response;
}

// email field validator
const emailFieldValidator = (fieldValue) => {
    let response = {
        errorMsg: "",
        validated: true
    }

    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!regExp.test(fieldValue)) {
        response.errorMsg = "Please enter a valid email e.g Johndoe1234@doe.com"
        response.validated = false
    }
    return response;
}

// phone number validator
const phoneNumberFieldValidator = (fieldValue) => {
    let response = {
        errorMsg: "",
        validated: true
    }
    const regExp = /^(?:0(?:[7-9][0-5])[0-9]{8})$/
    if(!regExp.test(fieldValue)) {
        response.errorMsg = "Invalid Nigerian phone Number. Must be exactly 11 digits and start with 070, 080, 090 etc."
        response.validated = false
    }
    return response;
}

// password validator
const passwordFieldValidator = (fieldValue, state) => {
    let response = { errorMsg: "", validated: true,
        extraFieldName: '',
        extraFieldValue: '',
        extraErroMsg: '',
        extraValidated: true
    }

    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/
    if(!regExp.test(fieldValue)) {
        response.errorMsg = "password should not be less than 6 characters, must contain atleast one uppercase, one number and one special character"
        response.validated = false
    }

    let confirmPasswordField = state['confirmPassword']
    if(confirmPasswordField && fieldValue !== confirmPasswordField.value.trim() && confirmPasswordField.validated) {
        response.errorMsg = "passwords do not match"
        response.validated = false
    }

    if(confirmPasswordField && fieldValue === confirmPasswordField.value.trim() && !confirmPasswordField.validated) {
        response.extraFieldName= 'confirmPassword',
        response.extraFieldValue= confirmPasswordField.value,
        response.extraErroMsg= '',
        response.extraValidated= true
    }

    return response;
}

// confirm password
const confirmPasswordFieldValidator = (fieldValue, state) => {
    let response = { errorMsg: "", validated: true,
        extraFieldName: '',
        extraFieldValue: '',
        extraErroMsg: '',
        extraValidated: true

    }

    let passwordField = state['password']
    if(fieldValue !== passwordField.value.trim()) {
        response.errorMsg = "passwords do not match"
        response.validated = false
    }
    if(fieldValue === passwordField.value.trim() && !passwordField.validated) {
        response.extraFieldName= 'password',
        response.extraFieldValue= passwordField.value,
        response.extraErroMsg= '',
        response.extraValidated= true
    }
    return response;
}

const meterIdValidator = (fieldValue, state) => {
    let response = {
        errorMsg: "",
        validated: true
    }
    
    if (fieldValue !== state.meter_id) {
        response.errorMsg = "not correct meterId",
        response.validated = false
    }
    return response;
}

// make all validators reuseable
export {
    nameFieldValidator,
    emailFieldValidator,
    phoneNumberFieldValidator,
    addressFieldValidator,
    passwordFieldValidator,
    confirmPasswordFieldValidator,
    meterIdValidator
}