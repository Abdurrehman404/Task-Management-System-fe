import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function CreateList(props) {
  const [err, setErr] = useState([false, ""]);
  const handleChange = (titleVal) => {
    if (titleVal.toLowerCase() === "To Do".toLowerCase()) {
      setErr([true, "To Do is the Name of default List"]);
    } else {
      setErr([false, ""]);
    }
  };
  const title = useRef();
  const handleClose = () => {
    props.setListClicked(false);
  };
  const handleCreate = () => {
    props.setListClicked(false);
    const list = {
      title: title.current.value,
      cardList: [],
    };
    axios
      .post("boardLists/create", list)
      .then((res) => {
        console.log("New List created", res.data.dto);
        props.addList(res.data.dto);
      })
      .catch((err) => {
        console.log("Error while creating new list");
        console.log(err);
      });
  };
  return (
    <div>
      <Dialog open={props.listClicked} onClose={handleClose}>
        <DialogTitle sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          Create a New List
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreate}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="List Title"
              fullWidth
              variant="outlined"
              required
              inputRef={title}
              inputProps={{ maxLength: 20 }}
              sx={{ marginTop: "1rem" }}
              onChange={() => handleChange(title.current.value)}
              error={err[0]}
              helperText={err[1]}
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
                disabled={err[0]}
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CreateList;
