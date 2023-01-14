import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function EditListName({
  openNameDialog,
  setOpenNameDialog,
  title,
  id,
  editListName,
}) {
  const handleClose = () => {
    setOpenNameDialog(false);
  };
  const [newTitle, setNewTitle] = useState(title);

  const handleUpdate = () => {
    editListName(id, newTitle);
    setOpenNameDialog(false);
  };
  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };
  return (
    <div>
      <Dialog open={openNameDialog} onClose={handleClose}>
        <DialogTitle sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          Edit List Name
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdate}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="List Title"
              fullWidth
              variant="outlined"
              required
              inputProps={{ maxLength: 20 }}
              sx={{ marginTop: "1rem" }}
              value={newTitle}
              onChange={handleChange}
            />

            <DialogActions>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="error"
                sx={{ margin: "1rem 1rem" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ margin: "1rem 0" }}
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default EditListName;
