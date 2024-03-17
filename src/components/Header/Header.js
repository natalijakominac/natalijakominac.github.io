import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Header.module.css";
import Button from "../UI/Button/Button";
import Navigation from "./Navigation";

const Header = (props) => {
  const navigate = useNavigate();

  const navigateToLoginHandler = () => {
    navigate("/login");
  };

  const navigateToSignUpHandler = () => {
    navigate("/sign-up");
  };

  const logoutHandler = () => {
    props.onLogout();
  };

  return (
    <React.Fragment>
      {props.isAuthenticated && (
        <header className={classes.header}>
          <Navigation
            isAuthenticated={props.isAuthenticated}
            onLogout={props.onLogout}
          />
          <div className={classes.headerActions}>
            <Button className={classes.button} onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        </header>
      )}
      {!props.isAuthenticated && (
        <header className={classes.headerActions}>
          <Button className={classes.button} onClick={navigateToLoginHandler}>
            Login
          </Button>
          <Button className={classes.button} onClick={navigateToSignUpHandler}>
            SignUp
          </Button>
        </header>
      )}
    </React.Fragment>
  );
};

export default Header;
