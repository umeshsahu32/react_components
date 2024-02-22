import React from "react";
import FormValidationWithoutYup from "./FormValidationWithoutYup";
import FormValidationWithYup from "./FormValidationWithYup";

const FormValidation = () => {
  return (
    <div>
      <FormValidationWithoutYup />
      <FormValidationWithYup />
    </div>
  );
};

export default FormValidation;
