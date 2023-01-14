import { useState } from "react";

export default function useInputState(intiialVal) {
  const [value, setValue] = useState(intiialVal);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return [value, handleChange, reset];
}
