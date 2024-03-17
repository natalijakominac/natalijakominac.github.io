import React, { useState } from "react";

import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && password.trim().length >= 8
    );
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length >= 8 && email.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(email.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length >= 8);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    props.onLogin(email, password);
  };

  return (
    <div className={classes.login}>
      <h2>{props.type}</h2>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.button}
            disabled={!formIsValid}
          >
            {props.type}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
