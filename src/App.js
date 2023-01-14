import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import LandingPage from "./components/LandingPage";
import UserCredentialPage from "./components/UserCredentialPage";
import "./App.css";
import React from "react";
import UserProvider from "./contexts/UserContext";
import AdminView from "./components/AdminView";
import UserHomePage from "./components/UserHomePage";
import PrivateRoute from "./utils/PrivateRoutes";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

function App() {
  axios.interceptors.request.use(function(config) {
    const token = Cookies.get("token");
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path="/update-profile" element={<UserInfo />} />
              <Route exact path="/homePage" element={<UserHomePage />} />
              <Route exact path="/user-management" element={<AdminView />} />
            </Route>
            <Route
              exact
              path="/credential-page"
              element={<UserCredentialPage />}
            />
            <Route exact path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
