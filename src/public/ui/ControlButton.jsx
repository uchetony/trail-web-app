import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ControlButton(props) {
    const { type, label, handleOnClick, disabled } = props
    return (
        <div>
           <button 
            disabled={disabled} 
            type={type}
            onClick={handleOnClick}
            >
                {/* { isSubmitting && <span>{submittingText} <FontAwesomeIcon icon="spinner" pulse size="lg" /></span>} */}
                { label}
            </button> 
        </div>
    )
}
