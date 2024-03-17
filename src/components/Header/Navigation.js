import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isAuthenticated && (
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        )}
        {props.isAuthenticated && (
          <li>
            <NavLink to="/map">Map</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
