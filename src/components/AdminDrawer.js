import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminDrawer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleSignOutClick = () => {
    Cookies.remove("token", { sameSite: "Lax", secure: true });
    Cookies.remove("globalUserCookie", { sameSite: "Lax", secure: true });
    navigate("/credential-page");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        PaperProps={{ style: { width: "17%" } }}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <AdminPanelSettingsIcon
            color="action"
            fontSize="large"
            sx={{
              marginRight: "0.5rem",
              marginLeft: "2rem",
            }}
          />

          <Typography sx={{ fontSize: "1.3rem", color: "grey" }}>
            Admin
          </Typography>
        </Toolbar>

        <Divider />
        <List>
          <ListItem
            key={"UserManagement"}
            selected={pathname === "/user-management"}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon
                sx={{
                  marginLeft: "3.4rem",
                }}
              >
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                sx={{ fontSize: "17px", marginLeft: "-1.6rem" }}
              >
                Users
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List style={{ marginTop: `auto` }}>
          <ListItem key="SignOut">
            <Button
              variant="contained"
              padding={2}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "0.6rem",
                textTransform: "none",
              }}
              size="small"
              onClick={handleSignOutClick}
            >
              Sign Out
            </Button>
          </ListItem>
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
    </Box>
  );
}
export default AdminDrawer;
