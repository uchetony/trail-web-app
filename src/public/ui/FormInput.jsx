import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FormInput(props) {
    const { type, name, value, handleInputChange, label, icon } = props;
    const [showPassword, setShowPassword] = useState(false);

    const doSetShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="formGroup">
            <label>
                <div className="input-field">
                    {icon && (
                        <i className="left-icon" >
                            <FontAwesomeIcon icon={icon} />
                        </i>
                    )}

                    {(type === "password" && value ) && (
                        <i className="right-icon" onClick={doSetShowPassword} >
                            <FontAwesomeIcon icon={!showPassword ? "eye" : "eye-slash"} />
                        </i>
                    )}

                    <input 
                        type={ (type === "password") ? (!showPassword ? type : "text") : type}
                        placeholder={label}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                    />
                </div>
                <small className="error">{props.errorMsg}</small>
            </label>
        </div>
    )
}
