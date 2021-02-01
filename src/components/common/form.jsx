import React from "react";
import Joi from "joi-browser";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import SubmitButton from "./SubmitButton";

const INITIAL_FORM_STATE = {
  data: {},
  errors: {},
};

export default function Form(props) {
  const {
    doSubmit,
    state,
    errorSchema,
    submitButton,
    inputFields,
    formSubmitting,
  } = props;

  const [formState, setFormState] = React.useState({ ...INITIAL_FORM_STATE });

  React.useEffect(() => {
    setFormState((formState) =>
      formState.data ? { ...formState } : { ...state }
    );
  }, [state]);

  // fix this method
  const validateForm = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formState.data, errorSchema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  // fix this method
  const validateInputField = (name, value) => {
    const validationObj = { [name]: value };
    const inputSchema = { [name]: errorSchema[name] };
    const { error } = Joi.validate(validationObj, inputSchema);

    return error ? error.details[0].message : null;
  };

  const handleChange = ({ target: { name, value } }) => {
    const data = { ...formState.data };
    data[name] = value;

    const errors = { ...formState.errors };
    const errorMessage = validateInputField(name, value);
    errorMessage ? (errors[name] = errorMessage) : delete errors[name];

    setFormState({ data, errors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormState({ ...formState, errors: errors || {} });
    if (errors) return;

    doSubmit(formState.data);
  };

  const renderInputField = (
    { name, type = "text", label, icon, placeholder },
    index
  ) => {
    return (
      <FormInput
        key={index}
        name={name}
        value={formState.data[name] || ""}
        label={label}
        type={type}
        errorMsg={formState.errors[name]}
        handleInputChange={handleChange}
        icon={icon}
        placeholder={placeholder}
      />
    );
  };

  const renderSelectField = (
    { name, options, valueProp, textProp, defaultText },
    index
  ) => {
    return (
      <FormSelect
        key={index}
        name={name}
        options={options}
        onChange={handleChange}
        errorMsg={formState.errors[name]}
        valueProp={valueProp}
        textProp={textProp}
        defaultText={defaultText}
      />
    );
  };

  const renderSubmitButton = ({ label, submittingText }) => {
    return (
      <SubmitButton
        disabled={validateForm()}
        type="submit"
        label={label}
        isSubmitting={formSubmitting}
        submittingText={submittingText}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputFields.map((field, index) =>
        field.options
          ? renderSelectField(field, index)
          : renderInputField(field, index)
      )}
      {submitButton && renderSubmitButton(submitButton)}
    </form>
  );
}
