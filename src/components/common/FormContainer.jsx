import React from "react";
import SubmitButton from "./SubmitButton";
import FormControl from "./FormControl";

import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function FormContainer(props) {
  const {
    doSubmit,
    state,
    validationSchema,
    submitButton,
    formFields,
    formSubmitting,
  } = props;

  const [formState, setFormState] = React.useState({});

  React.useEffect(() => {
    setFormState((formState) => (formState ? { ...formState } : { ...state }));
  }, [state]);

  const handleSubmit = (values) => {
    doSubmit(values);
  };

  const renderFormField = (field, formik, index) => {
    return (
      <FormControl
        key={index}
        field={field}
        value={formik.values[field.name] || ""}
      />
    );
  };

  const renderSubmitButton = ({ label, submittingText }, formik) => {
    return (
      <SubmitButton
        disabled={!(formik.dirty && formik.isValid)}
        type="submit"
        label={label}
        isSubmitting={formSubmitting}
        submittingText={submittingText}
      />
    );
  };

  return (
    <Formik
      initialValues={{ ...formState.data }}
      validationSchema={Yup.object({ ...validationSchema })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(formik) => (
        <Form>
          {formFields.map((field, index) =>
            renderFormField(field, formik, index)
          )}
          {submitButton && renderSubmitButton(submitButton, formik)}
        </Form>
      )}
    </Formik>
  );
}
