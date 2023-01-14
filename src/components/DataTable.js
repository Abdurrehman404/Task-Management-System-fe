import * as React from "react";
import { useState, useEffect, forwardRef } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminUserInfo from "./AdminUserInfo";
import AdminDrawer from "./AdminDrawer";
import { stringAvatar } from "../helpers/avatar";
import CustomPagination from "./CustomPagination";

export default function DataTable({ allUsers, loading, setAllUsers }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [userData, setUserData] = useState({});
  const [updateClicked, setUpdateClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [successReq, setSuccessReq] = useState(false);
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

  useEffect(() => {
    const newArr = allUsers.map((obj) => {
      if (obj.id === userData.id) {
        return userData;
      }
      return obj;
    });
    setAllUsers(newArr);
    setUpdateClicked(false);
  }, [updateClicked]);

  useEffect(() => {
    const newArr2 = allUsers.filter((obj) => {
      return obj.id !== userData.id;
    });
    setAllUsers(newArr2);
    setDeleteClicked(false);
  }, [deleteClicked]);

  if (loading) return null;

  const rows = allUsers;

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16, textTransform: "none" }}
          onClick={() => {
            setButtonClicked(true);
            setUserData(params.row);
          }}
        >
          More Info
        </Button>
      </strong>
    );
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: "80",
      disableColumnMenu: true,
      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Avatar {...stringAvatar(params.row.name)} />
          </>
        );
      },
    },

    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 210,
    },
    {
      field: "id",
      headerName: "ID",
      width: 250,
    },
    {
      field: "button",
      headerName: "Manage User",
      width: 186,
      sortable: false,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
      disableColumnMenu: true,
    },
  ];

  return (
    <Box style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
      <Grid container>
        <Grid item xs={2}>
          <AdminDrawer />
        </Grid>
        <Grid item xs={10}>
          <Paper
            sx={{
              height: "100vh",
              width: "100%",
              backgroundColor: "white",
              "& .super-app-theme--header1": {
                backgroundColor: "rgba(210, 228, 249, 0.8)",
              },
              "& .super-app-theme--header2": {
                backgroundColor: "rgba(163, 165, 168, 0.22)",
              },
            }}
            elevation={0}
          >
            <DataGrid
              sx={{
                boxShadow: 2,
                "& .MuiDataGrid-cell:hover": {
                  //To show blue color when cell data is hovered on
                  color: "primary.main",
                },
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                  //To remove blue outline when selected
                  outline: "none",
                },
              }}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              components={{
                Pagination: CustomPagination,
              }}
            />
          </Paper>
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
              <SnackbarAlert onClose={handleSnackBarClick} severity="success">
                Operation Done Successfully
              </SnackbarAlert>
            ) : (
              <SnackbarAlert onClose={handleSnackBarClick} severity="error">
                Error!
              </SnackbarAlert>
            )}
          </Snackbar>
        </Grid>
        <Grid item xs={12}>
          {buttonClicked === true ? (
            <AdminUserInfo
              userData={userData}
              buttonClicked={buttonClicked}
              setButtonClicked={setButtonClicked}
              setUserData={setUserData}
              setUpdateClicked={setUpdateClicked}
              setDeleteClicked={setDeleteClicked}
              setSuccessReq={setSuccessReq}
              setSnackOpen={setSnackOpen}
            />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
}
