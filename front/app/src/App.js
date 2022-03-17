import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import { FormattedMessage } from "react-intl";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import BoardEmployee from "./components/BoardEmployee/BoardEmployee";
import BoardAdmin from "./components/BoardAdmin/BoardAdmin";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = (props) => {  
  const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowEmployeeBoard(user.roles.includes("ROLE_EMPLOYEE"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowEmployeeBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <FormattedMessage
            id="navbar.title"
            defaultMessage="Book Manager"
          />
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              <FormattedMessage id="navbar.home" defaultMessage="Home" />
            </Link>
          </li>

          {showEmployeeBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                <FormattedMessage
                  id="navbar.employee"
                  defaultMessage="Employee"
                />
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                <FormattedMessage id="navbar.admin" defaultMessage="Admin" />
              </Link>
            </li>
          )}

         
          )
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                <FormattedMessage id="navbar.logout" defaultMessage="Logout" />
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                <FormattedMessage id="navbar.login" defaultMessage="Login" />
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                <FormattedMessage id="navbar.signup" defaultMessage="Sign Up" />
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />      
          <Route path="/mod" component={BoardEmployee} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>
      </div>
     

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
