import React from "react";
import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InfoField from "./InfoField";
import {
  Paper,
  Stack,
  Button,
  List,
  Grid,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { stringAvatar } from "../helpers/avatar";
import { Snackbar, Alert } from "@mui/material";
import { useGlobalUser } from "../contexts/UserContext";
import Cookies from "js-cookie";

function UserInfo() {
  const { globalUser, setGlobalUser } = useGlobalUser();
  const [editOpen, setEditOpen] = useState(false);

  const [info, setInfo] = useState(globalUser);

  //info state is updated
  const editField = (field, value) => {
    setInfo({
      ...info,
      [field]: value,
    });
  };

  const [successReq, setSuccessReq] = useState(false);

  // Updating data call
  const updatePostRequest = async () => {
    // Logic for update call
    try {
      // API call here
      const postReq = axios.post("users/updateUser", info);
      await postReq;
      setSuccessReq(true);
      setGlobalUser(info);
      Cookies.set("globalUserCookie", JSON.stringify(info), {
        expires: 1,
        sameSite: "Lax",
        secure: true,
      });
    } catch (err) {
      console.log(err);
      setSuccessReq(false);
    }
    setSnackOpen(true);
  };

  // Code for snackbar implementation

  const [snackOpen, setSnackOpen] = useState(false);

  const handleSnackBarClick = (evt, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />;
  });

  const handleClick = () => {
    updatePostRequest();
  };
  return (
    <Box
      style={{
        backgroundImage: "url(" + require("../images/bg.jpg") + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* if data is not available */}
      {Object.keys(info).length === 0 ? (
        <Box
          sx={{
            padding: 0,
            margin: "17rem 4rem 5rem 40rem",
          }}
        >
          <Snackbar
            open={true}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <SnackbarAlert severity="error">Error Loading Data!</SnackbarAlert>
          </Snackbar>
        </Box>
      ) : (
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              sx={{ marginTop: "13rem", marginLeft: "5rem" }}
              fontSize={38}
              fontWeight="bold"
              align="left"
            >
              <span
                style={{
                  fontSize: "56px",
                  color: "blue",
                }}
              >
                All-IN-ONE
              </span>{" "}
              PROJECT MANAGEMENT AND COLABORATION SOFTWARE.
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Paper
              sx={{
                paddingRight: "6rem",
                paddingLeft: "6rem",
                height: "100vh",
                width: "60%",
                backgroundColor: "white",
              }}
              elevation={0}
            >
              <Grid container justifyContent="center">
                <Grid item lg={12} align="left">
                  <Stack
                    direction="row"
                    spacing={4}
                    sx={{
                      marginTop: "5rem",
                      marginLeft: "1rem",
                    }}
                  >
                    <Avatar {...stringAvatar(info.name)} />
                    <Typography variant="h4">Profile Information</Typography>
                  </Stack>
                  <Stack
                    sx={{
                      marginLeft: "2rem",
                      marginTop: "2rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Username :</span>{" "}
                      {info.userName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4} md={8} lg={10}>
                  <List>
                    <InfoField
                      field="name"
                      value={info.name}
                      editField={editField}
                      label="Name"
                      setEditOpen={setEditOpen}
                    />
                    <InfoField
                      field="email"
                      value={info.email}
                      editField={editField}
                      label="Email"
                      setEditOpen={setEditOpen}
                    />
                    <InfoField
                      field="password"
                      value={info.password}
                      editField={editField}
                      label="Password"
                      setEditOpen={setEditOpen}
                    />
                  </List>
                </Grid>
                <Stack spacing={10} direction="row" marginTop="2rem">
                  <Button
                    variant="contained"
                    sx={{
                      "& a": {
                        color: "white",
                      },
                    }}
                  >
                    <Link to="/homePage" style={{ textDecoration: "none" }}>
                      Go Back
                    </Link>
                  </Button>
                  <LoadingButton
                    onClick={handleClick}
                    variant="contained"
                    loading={false}
                    disabled={editOpen}
                  >
                    Update
                  </LoadingButton>
                </Stack>
              </Grid>
              <Snackbar
                open={snackOpen}
                autoHideDuration={3000}
                onClose={handleSnackBarClick}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                {successReq === true ? (
                  <SnackbarAlert
                    onClose={handleSnackBarClick}
                    severity="success"
                  >
                    Data Updated successfully!
                  </SnackbarAlert>
                ) : (
                  <SnackbarAlert onClose={handleSnackBarClick} severity="error">
                    Error updating data!
                  </SnackbarAlert>
                )}
              </Snackbar>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
export default UserInfo;
