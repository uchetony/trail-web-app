// import validators
import { emailFieldValidator, 
    nameFieldValidator, 
    confirmPasswordFieldValidator, phoneNumberFieldValidator,
    passwordFieldValidator,
    addressFieldValidator,
    meterIdValidator, } from './formValidator';

    export const validateField = (fieldName, fieldValue, state) => {
        let validator;
        switch (fieldName) {
            case "fullName":
                validator = nameFieldValidator(fieldValue)
                break;
            case "email":
                validator = emailFieldValidator(fieldValue.trim())
                break;
            case "password":
                validator = passwordFieldValidator(fieldValue.trim(), state)
                break;
            case "confirmPassword":
                validator = confirmPasswordFieldValidator(fieldValue.trim(), state)
                break;
            case "phoneNumber": 
                validator = phoneNumberFieldValidator(fieldValue.trim())
                break;
            case "address": 
                validator = addressFieldValidator(fieldValue.trim())
                break;
            case "meterId":
                validator = meterIdValidator(fieldValue.trim(), state)
                break;
            default:
                return
        }

        return {
            [fieldName]: { 
                value: fieldValue,
                errorMsg: validator.errorMsg,
                validated: validator.validated,
                required: true,
            },
            [validator.extraFieldName || '']: {
                value: validator.extraFieldValue || '',
                errorMsg: validator.extraErroMsg || '',
                validated: validator.extraValidated || '',
                required: true
            }
        }
    }