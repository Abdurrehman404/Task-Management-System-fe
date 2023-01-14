import { useState } from "react";

function useFormInputState(initialFormValue) {
  const [values, setValues] = useState(initialFormValue);
  const handleFormChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = (initialFormValue) => {
    setValues(initialFormValue);
  };

  return [values, handleFormChange, reset];
}

export default useFormInputState;
