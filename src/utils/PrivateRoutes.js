import { Outlet, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const location = useLocation();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let globalUser = {};
    if (Cookies.get("globalUserCookie") !== undefined) {
      globalUser = JSON.parse(Cookies.get("globalUserCookie"));
    }
    let authFunction = async () => {
      try {
        const postReq = await axios.post("users/validateToken", {
          token: Cookies.get("token"),
        });
        if (postReq.data.dto === true) {
          if (
            Cookies.get("globalUserCookie") === undefined ||
            Cookies.get("globalUserCookie") === null ||
            Cookies.get("globalUserCookie") === "undefined"
          ) {
            setAuth(false);
            console.log("User not defined");
          } else {
            // Testing page access
            let userType = globalUser.type;
            if (
              location.pathname === "/update-profile" ||
              location.pathname === "/homePage"
            ) {
              userType === "user" ? setAuth(true) : setAuth(false);
            } else if (location.pathname === "/user-management") {
              userType === "admin" ? setAuth(true) : setAuth(false);
            } else {
              setAuth(true);
            }
          }
        } else {
          setAuth(false);
        }
      } catch (err) {
        console.log("Error while getting token from server", err);
        setAuth(false);
      }
      setLoading(false);
    };
    authFunction();
  }, [location, auth]);

  return !loading ? (
    auth ? (
      <Outlet />
    ) : (
      <Navigate to="/credential-page" />
    )
  ) : null;
};

export default PrivateRoutes;
