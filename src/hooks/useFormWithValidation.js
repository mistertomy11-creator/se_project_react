import { useState, useCallback } from "react";

// A form hook that tracks values, errors and overall validity.
// Validation is triggered manually via validateForm() to show errors only on submit.
// API: useFormWithValidation(defaultValues, customValidators)
// Returns: { values, handleChange, resetForm, setValues, errors, isValid, validateForm }
export function useFormWithValidation(
  defaultValues = {},
  customValidators = {}
) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true); // true by default (errors not shown yet)

  // Simple onChange handler - just update values, don't validate yet
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form and show errors. Returns true if valid, false if invalid.
  const validateForm = useCallback(
    (formElement = null) => {
      const newErrors = {};

      // Use custom validators if provided
      if (customValidators && typeof customValidators === "function") {
        const validationResults = customValidators(values);
        Object.assign(newErrors, validationResults);
      } else if (customValidators && typeof customValidators === "object") {
        // customValidators is an object with field names as keys
        Object.keys(customValidators).forEach((fieldName) => {
          const validator = customValidators[fieldName];
          if (typeof validator === "function") {
            const errorMsg = validator(values[fieldName]);
            if (errorMsg) newErrors[fieldName] = errorMsg;
          }
        });
      }

      // Also check HTML5 validation if form element available
      if (formElement && typeof formElement.checkValidity === "function") {
        const isHTMLValid = formElement.checkValidity();
        if (!isHTMLValid) {
          // Collect validation messages from form controls
          const controls = formElement.elements;
          for (let i = 0; i < controls.length; i++) {
            const control = controls[i];
            if (control.name && control.validationMessage) {
              newErrors[control.name] = control.validationMessage;
            }
          }
        }
      }

      setErrors(newErrors);
      const formIsValid = Object.keys(newErrors).length === 0;
      setIsValid(formIsValid);
      return formIsValid;
    },
    [values, customValidators]
  );

  const resetForm = useCallback(
    (newValues = defaultValues, newErrors = {}, newIsValid = true) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [defaultValues]
  );

  return {
    values,
    handleChange,
    resetForm,
    setValues,
    errors,
    isValid,
    validateForm,
  };
}

export default useFormWithValidation;
