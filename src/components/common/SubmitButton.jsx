import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SubmitButton(props) {
  const { label, disabled, isSubmitting, submittingText, ...rest } = props;
  return (
    <div>
      <button
        {...rest}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {isSubmitting && (
          <span>
            {submittingText} <FontAwesomeIcon icon="spinner" pulse size="lg" />
          </span>
        )}
        {!isSubmitting && label}
      </button>
    </div>
  );
}
