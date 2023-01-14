import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TaskCard({
  card,
  provided,
  innerRef,
  editCardDialog,
  deleteCardDialog,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const handleDelete = () => {
    deleteCardDialog(card);
  };
  const handleEdit = () => {
    editCardDialog(card);
  };
  return (
    <Card
      sx={{
        width: 270,
        marginTop: "0.1rem",
        borderRadius: "6%",
        marginLeft: "0.2rem",
        marginRight: "0.2rem",
      }}
      onMouseOver={() => {
        setShowOptions(true);
      }}
      onMouseOut={() => {
        setShowOptions(false);
      }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {card.title}
        </Typography>
        <Typography variant="body2">
          {card.task}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Chip
          label={card.type}
          variant="outlined"
          size="small"
          style={{
            backgroundColor: `${card.hex === null ? "#C1EFFF" : card.hex}`,
          }}
          sx={{ marginLeft: "0.5rem", color: "black" }}
        />
        {showOptions && (
          <>
            <IconButton
              sx={{ padding: "0", marginLeft: "auto" }}
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ padding: "0", marginLeft: "auto" }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
export default TaskCard;
