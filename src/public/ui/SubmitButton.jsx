import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SubmitButton(props) {
    const { disabled, type, label, isSubmitting, submittingText, handleOnClick } = props
    return (
        <div>
           <button 
            disabled={disabled} 
            type={type}
            onClick={handleOnClick}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
                { isSubmitting && <span>{submittingText} <FontAwesomeIcon icon="spinner" pulse size="lg" /></span>}
                { !isSubmitting && label}
            </button> 
        </div>
    )
}
