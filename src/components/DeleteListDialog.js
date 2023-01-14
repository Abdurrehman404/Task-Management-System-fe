import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function DeleteDialog({
  setOpenDeleteDialog,
  openDeleteDialog,
  id,
  deleteList,
}) {
  const handleDelete = () => {
    deleteList(id);
    setOpenDeleteDialog(false);
  };
  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Delete this List?"}
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
