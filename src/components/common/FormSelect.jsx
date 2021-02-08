import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Field, ErrorMessage } from "formik";
import FormError from "./FormError";

export default function FormSelect(props) {
  const { name, options, valueProp, textProp, defaultText, ...rest } = props;
  return (
    <div className="formGroup">
      <label htmlFor={name}>
        <div className="input-field">
          <i className="left-icon">
            <FontAwesomeIcon icon="mouse-pointer" />
          </i>

          <Field as="select" id={name} name={name} {...rest}>
            <React.Fragment>
              <option value="">--{defaultText}--</option>
              {options.map((opt) => {
                return (
                  <option value={opt[valueProp]} key={opt[valueProp]}>
                    {opt[textProp]}
                  </option>
                );
              })}
            </React.Fragment>
          </Field>
        </div>
        <ErrorMessage name={name} component={FormError} />
      </label>
    </div>
  );
}
