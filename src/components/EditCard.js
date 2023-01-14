import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
function EditCard({
  card,
  showEditDialog,
  setShowEditDialog,
  editCardDetails,
}) {
  const [editedCard, setEditedCard] = useState(card);
  const handleClose = () => {
    setShowEditDialog(false);
  };
  const handleUpdate = () => {
    editCardDetails(editedCard);
    setShowEditDialog(false);
  };
  const handleChange = (e) => {
    setEditedCard({ ...editedCard, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <Dialog open={showEditDialog} onClose={handleClose}>
        <DialogTitle sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          Edit the Card Information
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdate}>
            <TextField
              margin="dense"
              id="title"
              label="Task Title"
              fullWidth
              variant="outlined"
              required
              inputProps={{ maxLength: 30 }}
              sx={{ marginTop: "1rem" }}
              value={editedCard.title}
              onChange={handleChange}
            />
            <TextField
              multiline={true}
              rows={4}
              margin="dense"
              id="task"
              label="Task Details"
              fullWidth
              variant="outlined"
              required
              inputProps={{ maxLength: 200 }}
              sx={{ marginTop: "1rem" }}
              value={editedCard.task}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="type"
              label="Task Type"
              fullWidth
              variant="outlined"
              required
              inputProps={{ maxLength: 20 }}
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              value={editedCard.type}
              onChange={handleChange}
            />
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="error"
                sx={{ margin: "0 1rem" }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default EditCard;
