import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Field, ErrorMessage } from "formik";
import FormError from "./FormError";

export default function FormInput(props) {
  const { name, type, icon, value, ...rest } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const doSetShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="formGroup">
      <label htmlFor={name}>
        <div className="input-field">
          {icon && (
            <i className="left-icon">
              <FontAwesomeIcon icon={icon} />
            </i>
          )}

          {type === "password" && value && (
            <i className="right-icon" onClick={doSetShowPassword}>
              <FontAwesomeIcon icon={!showPassword ? "eye" : "eye-slash"} />
            </i>
          )}

          <Field
            type={type === "password" ? (!showPassword ? type : "text") : type}
            id={name}
            name={name}
            value={value}
            {...rest}
          />
        </div>
        <ErrorMessage name={name} component={FormError} />
      </label>
    </div>
  );
}
