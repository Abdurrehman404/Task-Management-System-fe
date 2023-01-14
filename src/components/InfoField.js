import React, { useEffect } from "react";
import useToggleState from "../hooks/useToggleState";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Paper } from "@mui/material";
import { ListItemSecondaryAction } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditField from "./EditField";
//Component for one field
function InfoField(props) {
  const [isEditing, toggle] = useToggleState(false);

  useEffect(() => {
    if (props.setEditOpen !== undefined) {
      props.setEditOpen(isEditing);
    }
  }, [isEditing]);

  return (
    <Paper>
      <ListItem style={{ height: "60px", margin: "1.5rem 0" }}>
        {isEditing ? (
          <EditField
            editField={props.editField}
            field={props.field}
            value={props.value}
            toggleEditForm={toggle}
          />
        ) : (
          <>
            <ListItemText>
              <span style={{ fontWeight: "bold" }}>{props.label} :</span>{" "}
              {props.value}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Edit"
                onClick={toggle}
                disabled={props.field === "userName" ? true : false}
              >
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </>
        )}
      </ListItem>
    </Paper>
  );
}
export default InfoField;
