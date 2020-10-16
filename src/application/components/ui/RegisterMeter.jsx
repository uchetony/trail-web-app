import React from 'react'
import WithPopUp from '../../../hoc/WithPopUp'
import FormInput from '../../../public/ui/FormInput'
import { useState } from 'react'
import SubmitButton from '../../../public/ui/SubmitButton'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { useEffect } from 'react'
import '../styles/RegisterMeter.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const INITIAL_STATE = {
    meterId: { value: '', errorMsg: '', validated: false, required: true },
    disco: { value: '', errorMsg: '', validated: false, required: true },
}
const RegisterMeter = ({ userDetails, handleUpdateToken, handleIsOpenPopUp }) => {

    const [meterDetails, setmeterDetails] = useState({ ...INITIAL_STATE });
    const [isSubmitting, setisSubmitting] = useState(null);

    const [userId, setUserId] = useState('');

    const [discos, setdiscos] = useState(null)

    // const availableCompanies = discos;

    const getStakeholders = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT_BASE_URL}/api/stakeholders`);
            const { data } = response;
            setdiscos(data);
        } catch (ex) {
            if (ex.response) {
                const { data } = ex.response
                NotificationManager.error(data, 'Error!', 5000);
            } else {
                NotificationManager.error('Could not connect to server', 'Error!', 5000);
            }
        }
    }

    useEffect(() => {
        setUserId(userDetails._id)
        getStakeholders();
    }, [userDetails])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let validationResult = validateField(name, value);
        setmeterDetails({ ...meterDetails, ...validationResult });
    }

    const validateField = (fieldName, fieldValue) => {
        let validator;
        switch (fieldName) {
            case 'meterId':
                validator = function () {
                    let response = { errorMsg: "", validated: true };
                    if (fieldValue !== userDetails._id) {
                        return response = {
                            errorMsg: "Please confirm that you entered the valid meter number",
                            validated: false
                        }
                    }
                    return response;
                }
                break;
            case 'disco':
                validator = function () {
                    let response = { errorMsg: "", validated: true };
                    if (!fieldValue) {
                        return response = {
                            errorMsg: "Please select a distribution company",
                            validated: false
                        }
                    }
                    return response;
                }
                break;
            default:
                return
        }

        return {
            [fieldName]: {
                value: fieldValue,
                errorMsg: validator().errorMsg,
                validated: validator().validated,
                required: true,
            },
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisSubmitting(true);

        // get company id and name to sen to server
        let companyName;
        discos.forEach((el) => {
            if (el._id === meterDetails.disco.value) {
                companyName = el.companyName
            }
        })

        const billingData = {
            userId: userId,
            meterId: meterDetails.meterId.value,
            companyId: meterDetails.disco.value, //will later change this to the company id from the database.....{meterDetails.disco.value}
            companyName
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_ENDPOINT_BASE_URL}/api/users/${userDetails._id}/billing`, billingData);
            NotificationManager.success('Meter added successfully', 'Successful!', 5000);
            setisSubmitting(false);
            // get token and update
            const { token } = res.data;
            handleUpdateToken(token);

            // close the popup
            handleIsOpenPopUp(null);
            window.location = "/app"
        } catch (ex) {
            if (ex.response) {
                const { data } = ex.response
                setisSubmitting(false);
                NotificationManager.error(data, 'Error!', 5000);
            } else {
                setisSubmitting(false);
                NotificationManager.error('Could not connect to server', 'Error!', 5000);
            }
        }
    }

    const { meterId, disco } = meterDetails
    const isEnabled = meterId.validated && disco.validated;

    return (
        <div className="register-meter-holder">

            <div className="register-meter-holder-top">
                <h3> Register new meter </h3>
                <small>{userDetails._id}</small>
            </div>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Meter Id"
                    type="text"
                    name="meterId"
                    icon="tachometer-alt"
                    placeholder="Enter meter id"
                    handleInputChange={handleInputChange}
                    errorMsg={meterId.errorMsg}
                    value={meterId.value}
                />

                <div className="formGroup">
                    <div className="input-field">
                        <i className="left-icon" >
                            <FontAwesomeIcon icon="mouse-pointer" />
                        </i>

                        <select name="disco" defaultValue={'DEFAULT'} onChange={handleInputChange} >
                            <option disabled value='DEFAULT'> Select company </option>
                            {discos && discos.map((el, index) => {
                                return <option value={el._id} key={index} > {el.companyName} </option>
                            })}
                        </select>
                    </div>
                </div>

                <SubmitButton
                    disabled={!isEnabled}
                    type="submit"
                    label="register meter"
                    isSubmitting={isSubmitting}
                    submittingText="registering meter"
                />
            </form>

        </div>
    )
}

export default WithPopUp({ component: RegisterMeter })
