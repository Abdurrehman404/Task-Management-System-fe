import Box from "@mui/material/Box";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";

function NavBar({ page, setPage, setpswPage }) {
  const handleTabChange = (evt, value) => {
    setpswPage(0);
    setPage(value);
  };

  const handleOnClick = () => {
    setpswPage(0);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          background: "white",
          fontFamily: "PT Sans, sans-serif",
          height: "3.5rem",
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            marginLeft: "2.5rem",
          }}
        >
          <FontAwesomeIcon
            icon={faListCheck}
            style={{
              fontSize: "30px",
              color: "#261daa",
              marginBottom: "0.3rem",
            }}
          />
          <Fade left>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <h3
                style={{
                  color: "#4c4c4d",
                  fontSize: "30px",
                  marginLeft: "0.5rem",
                  marginTop: "1.5rem",
                  flexGrow: "1",
                  opacity: "1",
                }}
              >
                TaskZone
              </h3>
            </Link>
          </Fade>
          <div style={{ flexGrow: 1 }}></div>
          <TabContext value={page}>
            <TabList
              aria-label="Tabs example"
              onChange={handleTabChange}
              onClick={handleOnClick}
              sx={{ mb: "0.3rem" }}
              TabIndicatorProps={{ style: { background: "black" } }}
            >
              <Tab
                label="Sign Up"
                value="1"
                sx={{
                  color: "black",
                  width: "17rem",
                }}
              />
              <Tab
                label="Sign In"
                value="2"
                sx={{
                  color: "black",
                  width: "17rem",
                }}
              />
            </TabList>
          </TabContext>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
