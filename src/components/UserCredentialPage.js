import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import NavBar from "./NavBar";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import ResetPassword from "./ResetPassword";
import ResetForm from "./ResetForm";
import { Bounce } from "react-reveal";

export default function UserCredentialPage() {
  // Hook to decide the opened page
  const [page, setPage] = useState("2");
  const [pswPage, setpswPage] = useState(0);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url(" + require("../images/backgroundImage.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        zIndex: "-1",
      }}
    >
      <NavBar setPage={setPage} page={page} setpswPage={setpswPage} />
      <Grid container>
        <Grid item xs={6} align="left">
          <Typography
            variant="h4"
            style={{
              marginTop: "18rem",
              marginLeft: "2rem",
              fontFamily: "PT Sans, sans-serif",
              color: "white",
              fontWeight: "bold",
            }}
          >
            WORK MANAGEMENT TOOL FOR MORE PRODUCTIVE{" "}
            <Bounce bottom>
              <span
                style={{
                  color: "blue",
                  fontSize: "50px",
                }}
              >
                AGILE
              </span>
            </Bounce>{" "}
            TEAMS.
          </Typography>
        </Grid>

        <Grid item xs={6} align="right">
          {pswPage === 1 ? (
            <ResetPassword setpswPage={setpswPage} />
          ) : pswPage === 2 ? (
            <ResetForm setpswPage={setpswPage} />
          ) : page === "1" ? (
            <SignUpForm setPage={setPage} />
          ) : (
            <SignInForm setpswPage={setpswPage} setPage={setPage} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
