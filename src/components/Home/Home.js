import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../UI/Button/Button";

import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <div className={classes.home}>
      <h1 className={classes.emphasized}>Welcome to Geodata Explorer!</h1>
      <h2>an interactive web application</h2>
      <br />
      {!props.isAuthenticated && (
        <h3>
          Please Sign Up to continue or Login if you already have an account
        </h3>
      )}
      {props.isAuthenticated && (
        <React.Fragment>
          <h3 className={classes.nav}>
            Here you can explore cities accross the world, see their population
            and more data. Click on the button below to start the journey.
          </h3>
          <Button>
            <NavLink to="/map">Explore</NavLink>
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
