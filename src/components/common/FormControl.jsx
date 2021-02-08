import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function FormControl({ field, value, ...rest }) {
  const {
    name,
    type,
    icon,
    label,
    control,
    options,
    valueProp,
    textProp,
    defaultText,
  } = field;

  switch (control || "input") {
    case "input":
      return (
        <FormInput
          name={name}
          type={type}
          icon={icon}
          value={value}
          placeholder={label}
          {...rest}
        />
      );
    case "select":
      return (
        <FormSelect
          name={name}
          options={options}
          valueProp={valueProp}
          textProp={textProp}
          defaultText={defaultText}
          {...rest}
        />
      );
    default:
      return null;
  }
}
