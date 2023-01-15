import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Paper, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";

function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url(" + require("../images/landingPage.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        zIndex: "-1",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Fade left>
          <FontAwesomeIcon
            icon={faListCheck}
            style={{
              fontSize: "50px",
              color: "#261daa",
              marginTop: "4.5rem",
            }}
          />
          <h3
            style={{
              color: "white",
              fontSize: "50px",
              opacity: "1",
              marginLeft: "1rem",
              marginTop: "4.5rem",
            }}
          >
            TaskZone
          </h3>
          
        </Fade>
      
      </Stack>
      <Paper
        sx={{
          padding: 0,
          width: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "6rem",
          height: "100px",
          backgroundColor: "transparent",
        }}
        elevation={0}
      >
        <h5
          style={{
            color: "white",
            fontSize: "30px",
            fontfamily: "Kanit sans-serif",
            textAlign: "center",
          }}
        >
          ONE OF THE LEADING MANAGEMENT TOOLS USED BY{" "}

          <Fade right>
            <span
              style={{
                color: "#261daa",
                fontSize: "35px",
              }}
            >
              AGILE
            </span>
          </Fade>{" "}
          TEAMS
        </h5>
        <Link to="/credential-page" style={{ textDecoration: "none" }}>
          <Button
            size="large"
            sx={{
              ml: 35,
              mt: -5,
              "& a": {
                color: "white",
              },
            }}
            variant="contained"
            color="success"
          >
            GET STARTED
          </Button>
        </Link>
        <h2>
            <a href="https://github.com/Abdurrehman404">By Abdur Rehman</a>
          </h2>
      </Paper>
    </Box>
  );
}
export default LandingPage;
