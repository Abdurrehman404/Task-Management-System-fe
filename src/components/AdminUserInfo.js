import React from "react";
import { useState } from "react";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Chip } from "@mui/material";
import InfoField from "./InfoField";
import axios from "axios";
export default function FormDialog({
  userData,
  buttonClicked,
  setButtonClicked,
  setUserData,
  setUpdateClicked,
  setDeleteClicked,
  setSnackOpen,
  setSuccessReq,
}) {
  const [open, setOpen] = useState(buttonClicked);

  const [editOpen, setEditOpen] = useState(false);

  const editField = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setButtonClicked(false);
  };
  // Updating data call
  const updatePostRequest = async () => {
    // Logic for update call
    try {
      let tmpObj = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      };

      // API call here
      const postReq = axios.post("users/adminUpdate", tmpObj);
      await postReq;
      setSuccessReq(true);
    } catch {
      setSuccessReq(false);
    }
    setSnackOpen(true);
  };

  const deletePostRequest = async () => {
    // Logic for update call
    try {
      // API call here
      const delReq = axios.delete(`users/deleteUser/${userData.id}`);
      await delReq;
      setSuccessReq(true);
    } catch {
      setSuccessReq(false);
    }
    setSnackOpen(true);
  };

  const resetGetRequest = async () => {
    try {
      const resetReq = axios.get(`users/reset/${userData.userName}`);
      await resetReq;
      setSuccessReq(true);
    } catch {
      setSuccessReq(false);
    }
    setSnackOpen(true);
  };

  const handleUpdate = async () => {
    updatePostRequest();
    setButtonClicked(false);
    setUpdateClicked(true);
  };
  const handleDelete = () => {
    deletePostRequest();
    setButtonClicked(false);
    setDeleteClicked(true);
  };
  const handleReset = () => {
    resetGetRequest();
    setButtonClicked(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ marginTop: "1rem" }}>
          User Profile
          <Chip
            label={userData.userName}
            variant="outlined"
            color="primary"
            sx={{ marginLeft: "1rem" }}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The Name and Email of user can be edited only. The user will receive
            an email of resetted password and the user can be deleted too.
          </DialogContentText>
          <InfoField
            field="name"
            value={userData.name}
            editField={editField}
            label="Name"
            setEditOpen={setEditOpen}
          />
          <InfoField
            field="email"
            value={userData.email}
            editField={editField}
            label="Email"
            setEditOpen={setEditOpen}
          />

          <Button
            onClick={handleReset}
            variant="contained"
            sx={{
              marginRight: "1rem",
              marginLeft: "2.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            Reset Password
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{
              marginRight: "1rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            Delete User
          </Button>
          <LoadingButton
            onClick={handleUpdate}
            variant="contained"
            color="success"
            loading={false}
            disabled={editOpen}
            sx={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Update Details
          </LoadingButton>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ marginRight: "1rem", marginBottom: "1rem" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
