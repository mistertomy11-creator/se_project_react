import { useState } from "react";

// TODO - Pass a default values array that has a name property,
// an image property and a weather property.
export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  // reset form back to initial defaultValues
  const resetForm = () => {
    setValues(defaultValues);
  };

  return { values, handleChange, resetForm, setValues };
}
