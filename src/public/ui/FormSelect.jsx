import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormSelect(props) {
  const {
    name,
    options,
    valueProp,
    textProp,
    defaultText,
    errorMsg,
    ...rest
  } = props;
  return (
    <div className="formGroup">
      <div className="input-field">
        <i className="left-icon">
          <FontAwesomeIcon icon="mouse-pointer" />
        </i>

        <select name={name} id={name} {...rest}>
          <option value="">--{defaultText}--</option>
          {options.map((opt) => {
            return (
              <option value={opt[valueProp]} key={opt[valueProp]}>
                {opt[textProp]}
              </option>
            );
          })}
        </select>
        <small className="error">{errorMsg}</small>
      </div>
    </div>
  );
}
