import React from 'react'

export default function FormTextArea(props) {
    const { name, value, handleInputChange, label, icon, errorMsg, isRequired } = props;
    return (
        <div className="formGroup">
            <label>
                <span className="label">{label}</span> <span className="required">{isRequired && '*'}</span>
                <textarea 
                    name={name}
                    value={value}
                    placeholder={label}
                    onChange={handleInputChange}
                    >
                </textarea>
                <br/>
                <small className="error">{errorMsg}</small>
            </label>
        </div>
    )
}
