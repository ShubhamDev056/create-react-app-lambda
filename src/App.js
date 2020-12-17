import React from "react";
// import {useSelector} from "react-redux";
// import {selectUser} from "./features/userSlice";
//import logo from './logo.svg';
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
// React Notification
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// import Mylookup from "./pages/Mylookup";
import EnterOtp from "./pages/EnterOtp";
import Logout from "./pages/Logout";
import AddEditLookups from "./pages/AddEditLookups";
import LoginDesign from "./pages/LoginDesign";
// import Lookups from "./pages/Lookups";
import ChangePassword from "./pages/ChangePassword";
import DoAlookup from "./pages/DoAlookup";
import WorldTable from "./pages/WorldTable ";
// //Before login
// import BeforeLoginHeader from "./components/partials/BeforeLogin/Header";
// import BeforeLoginFooter from "./components/partials/BeforeLogin/Footer";
//common components

// import Footer from "./components/partials/Footer";

function App({ location }) {
  // const user = useSelector(selectUser)
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/" component={Login} />
          <Route exact path="/login-design" component={LoginDesign} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password/:id" component={ResetPassword} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/my-lookup" component={WorldTable} />
          <Route exact path="/do-a-lookup" component={DoAlookup} />
          {/* <Route exact path="/lookup" component={Lookups} /> */}
          <Route exact path="/table" component={WorldTable} />
          <Route exact path="/addedit-lookup/:id?" component={AddEditLookups} />
          <Route exact path="/two-step-login/:id" component={EnterOtp} />
          <Route component={Error} />
        </Switch>
        {/* <Footer /> */}
        <NotificationContainer />
      </Router>
    </>
  );
}

export default withRouter(App);
