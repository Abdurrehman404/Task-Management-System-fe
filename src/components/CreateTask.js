import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function CreateTask(props) {
  const title = useRef();
  const task = useRef();
  const type = useRef();

  const chipColors = ["#FFDEB4", "#F2D7D9", "#ADCF9F", "#C6DCE4", "#B8FFF9"];
  let randomColor = chipColors[Math.floor(Math.random() * chipColors.length)];
  useEffect(() => {}, [props.newCard]);

  const handleClose = () => {
    props.setTaskClicked(false);
  };
  const handleCreate = () => {
    props.setTaskClicked(false);
    const card = {
      title: title.current.value,
      task: task.current.value,
      type: type.current.value,
      hex: randomColor,
    };
    axios
      .post("cards/create", card)
      .then((res) => {
        console.log("New created Card", res.data.dto);
        props.addCard(res.data.dto);
      })
      .catch((err) => {
        console.log("Error while creating a new card");
        console.log(err);
      });
  };
  return (
    <div>
      <Dialog open={props.taskClicked} onClose={handleClose}>
        <DialogTitle sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          Create a New Task in To-Do
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreate}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Task Title"
              fullWidth
              variant="outlined"
              required
              inputRef={title}
              inputProps={{ maxLength: 30 }}
              sx={{ marginTop: "1rem" }}
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
              inputRef={task}
              inputProps={{ maxLength: 200 }}
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              margin="dense"
              id="type"
              label="Task Type"
              fullWidth
              variant="outlined"
              required
              inputRef={type}
              inputProps={{ maxLength: 20 }}
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
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
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CreateTask;
