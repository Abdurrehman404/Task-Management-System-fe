import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Button, Typography } from "@mui/material";
import { stringAvatar } from "../helpers/avatar";
import { Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import { useNavigate } from "react-router-dom";
import { useGlobalUser } from "../contexts/UserContext";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskIcon from "@mui/icons-material/Task";
import { Tooltip } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function UserDrawer({
  open,
  handleDrawerClose,
  setTaskClicked,
  setListClicked,
}) {
  const theme = useTheme();
  const { globalUser } = useGlobalUser();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    setTimeout(() => {
      navigate("/update-profile");
    }, 500);
  };
  let Name = "";
  if (globalUser.name.split(" ")[1] === undefined) {
    Name = `${globalUser.name.split(" ")[0]}`;
  } else {
    Name = `${globalUser.name.split(" ")[0]} ${globalUser.name.split(" ")[1]}`;
  }

  const handleTask = () => {
    setTaskClicked(true);
  };
  const handleList = () => {
    setListClicked(true);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          {globalUser.name.includes(" ") ? (
            <>
              <div
                style={{
                  marginTop: "0.8rem",
                  marginRight: "1rem",
                  cursor: "pointer",
                }}
                onClick={handleProfileClick}
              >
                <Avatar {...stringAvatar(globalUser.name)} variant="rounded" />
              </div>
              <Typography
                sx={{
                  marginRight: "0.3rem",
                  marginTop: "1.3rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleProfileClick}
              >
                {Name}
              </Typography>
            </>
          ) : (
            <>
              <div
                style={{
                  marginTop: "0.8rem",
                  marginRight: "1rem",
                  cursor: "pointer",
                }}
                onClick={handleProfileClick}
              >
                <Avatar {...stringAvatar(globalUser.name)} variant="rounded" />
              </div>

              <Typography
                sx={{
                  marginRight: "4rem",
                  marginTop: "1.3rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleProfileClick}
              >
                {Name}
              </Typography>
            </>
          )}

          <IconButton
            onClick={handleDrawerClose}
            sx={{
              marginTop: "5px",
              marginBottom: "5px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ marginTop: "-0.5rem" }} />

        <List>
          <ListItem
            key={"Board"}
            selected={pathname === "/homePage"}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon
                sx={{
                  marginLeft: "3.4rem",
                }}
              >
                <ViewKanbanIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                sx={{ fontSize: "17px", marginLeft: "-1.6rem" }}
              >
                Board
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <ListItem key={"NewList"} disablePadding>
          <Tooltip
            title="Add a new list"
            placement="right"
            arrow
            enterDelay={400}
            leaveDelay={200}
          >
            <Button
              variant="contained"
              startIcon={<FormatListBulletedIcon />}
              sx={{
                paddingLeft: "2rem",
                paddingRight: "2.5rem",
                marginLeft: "2rem",
                marginBottom: "1rem",
                marginTop: "0.5rem",
                textTransform: "none",
              }}
              onClick={handleList}
            >
              New List
            </Button>
          </Tooltip>
        </ListItem>
        <ListItem key={"NewTask"} disablePadding>
          <Tooltip
            title="Add a new task in To Do List"
            placement="right"
            arrow
            enterDelay={400}
            leaveDelay={200}
          >
            <Button
              variant="outlined"
              startIcon={<TaskIcon />}
              sx={{
                paddingLeft: "2rem",
                paddingRight: "2rem",
                marginLeft: "2rem",
                marginBottom: "1rem",
                marginTop: "0.5rem",
                textTransform: "none",
              }}
              onClick={handleTask}
            >
              New Task
            </Button>
          </Tooltip>
        </ListItem>

        <List style={{ marginTop: `auto` }}>
          <Divider style={{ marginTop: "auto" }} />
          <ListItem key={"Help"} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  marginLeft: "4rem",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                sx={{ fontSize: "17px", marginLeft: "-1.6rem" }}
              >
                Help
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
export default UserDrawer;
