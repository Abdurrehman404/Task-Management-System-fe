import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function DeleteDialog({ showDeleteDialog, setShowDeleteDialog, deleteCard }) {
  const handleDelete = () => {
    deleteCard();
    setShowDeleteDialog(false);
  };
  const handleClose = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div>
      <Dialog
        open={showDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Delete this Card?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeleteDialog;
