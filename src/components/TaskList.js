import React, { useState } from "react";
import { Paper, Box, Typography, Stack } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import TaskCard from "./Card";
import { IconButton } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Draggable } from "react-beautiful-dnd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditListName from "./EditListName";
import DeleteListDialog from "./DeleteListDialog";

function TaskList({
  cardList,
  title,
  id,
  isDeleteable,
  provided,
  innerRef,
  snapshot,
  deleteCard,
  editCardDialog,
  deleteCardDialog,
  editListName,
  deleteList,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setShowOptions(false);
  };
  const handleListName = () => {
    setOpenNameDialog(true);
    setAnchorEl(null);
    setShowOptions(false);
  };
  const handleDeleteList = () => {
    setOpenDeleteDialog(true);
    setAnchorEl(null);
    setShowOptions(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 300,
        position: "relative",
        overflow: "auto",
        height: 530,
        maxHeight: 530,
        mr: "1rem",
        mt: "25px",
        ml: "1px",
      }}
      {...provided.droppableProps}
    >
      <List sx={{ padding: "0" }} id={id}>
        <ListSubheader
          sx={{
            backgroundColor: snapshot.isDraggingOver ? "lightblue" : "#F1F1F1",
            borderRadius: "3%",
          }}
          onMouseOver={() => {
            setShowOptions(true);
          }}
          onMouseOut={() => {
            setShowOptions(false);
          }}
        >
          <Stack direction="row">
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                padding: "10px 10px 0 10px",
              }}
            >
              {title.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                paddingTop: "0.7rem",
                fontSize: "13px",
              }}
            >
              {cardList.length}
            </Typography>
            <div
              style={{
                flexGrow: "1",
              }}
            ></div>
            {showOptions && isDeleteable && (
              <IconButton
                edge="end"
                aria-label="comments"
                sx={{}}
                aria-controls={open ? "basic-menu" : undefined}
                id="basic-button"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuOpenIcon fontSize="small" />
              </IconButton>
            )}
            {open ? (
              <Menu
                id="list-menu"
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                onClick={handleClose}
              >
                <MenuItem onClick={handleListName}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit List Name</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteList}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete List</ListItemText>
                </MenuItem>
              </Menu>
            ) : null}
          </Stack>
        </ListSubheader>
        <Paper
          ref={innerRef}
          sx={{
            width: 300,
            backgroundColor: snapshot.isDraggingOver ? "lightblue" : "#F1F1F1",
            position: "relative",
            overflow: "auto",
            height: 480,
            maxHeight: 480,
          }}
        >
          {cardList.length !== 0
            ? cardList.map((card, index) => (
                <ListItem key={card.id}>
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => {
                      return (
                        <TaskCard
                          card={card}
                          id={card.id}
                          index={index}
                          provided={provided}
                          innerRef={provided.innerRef}
                          deleteCard={deleteCard}
                          editCardDialog={editCardDialog}
                          deleteCardDialog={deleteCardDialog}
                        />
                      );
                    }}
                  </Draggable>
                </ListItem>
              ))
            : null}
        </Paper>
      </List>
      {openNameDialog && (
        <EditListName
          setOpenNameDialog={setOpenNameDialog}
          openNameDialog={openNameDialog}
          title={title}
          id={id}
          editListName={editListName}
        />
      )}
      {openDeleteDialog && (
        <DeleteListDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          id={id}
          deleteList={deleteList}
        />
      )}
    </Box>
  );
}

export default TaskList;
