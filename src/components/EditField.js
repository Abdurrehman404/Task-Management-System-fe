import React, { useEffect, useState } from "react";
import useInputState from "../hooks/useInputState";
import { TextField } from "@mui/material";

//For editing a data column
function EditField({ field, value, editField, toggleEditForm }) {
  const [val, handleChange, reset] = useInputState(value);
  const [errorHandle, setError] = useState(false);
  const [errorMsg, setMsg] = useState("");

  //validation checks, will be checked for each entered character
  useEffect(() => {
    if (field === "name") {
      let letter = /^[a-z ,.'-]+$/i;
      setError(!letter.test(val));
      if (errorHandle === true) {
        setMsg("Invalid Name");
      } else {
        setMsg("");
      }
    } else if (field === "email") {
      let email = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
      setError(!email.test(val));
      if (errorHandle === true) {
        setMsg("Invalid Email");
      } else {
        setMsg("");
      }
    } else if (field === "password") {
      let pass = /^\S*$/;
      if (val.length < 6) {
        setError(true);
        if (errorHandle === true) {
          setMsg("Length of Password should not be less than 6");
        }
      } else if (!pass.test(val)) {
        setError(true);
        if (errorHandle === true) {
          setMsg("Password cannot contain white spaces");
        }
      } else {
        setError(false);
        setMsg("");
      }
    } else if (field === "Board Name") {
      if (val.length > 15) {
        setError(true);
        setMsg("Board Name's length cannot exceed 15 characters");
      } else {
        setError(false);
        setMsg("");
      }
    }
  }, [field, val, errorHandle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editField(field, val);
    reset();
    toggleEditForm();
  };
  const showErr = (e) => {
    e.preventDefault();
    console.log("ERR");
  };
  return (
    <form
      onSubmit={errorHandle ? showErr : handleSubmit}
      style={{ marginLeft: "0rem", width: "100%" }}
    >
      <TextField
        value={val}
        onChange={handleChange}
        fullWidth
        autoFocus
        id="outlined-basic"
        variant="standard"
        label={field.toUpperCase()}
        required
        error={errorHandle}
        helperText={errorMsg}
        size="small"
      />
    </form>
  );
}
export default EditField;
