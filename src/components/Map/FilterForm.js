import React, { useState } from "react";

import classes from "./FilterForm.module.css";
import Button from "../UI/Button/Button";

const FilterForm = (props) => {
  const [offset, setOffset] = useState(0);
  const [cityNamePrefix, setCityNamePrefix] = useState("");
  const [minPopulation, setMinPopulation] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const changeOffsetHandler = (event) => {
    event.preventDefault();
    setOffset(offset + 1);
    props.onSearch(offset, cityNamePrefix, minPopulation);
    setIsEnd(Math.floor(props.totalCount / 10) <= offset + 1);
  };

  const namePrefixChangeHandler = (event) => {
    setCityNamePrefix(event.target.value);
    setOffset(0);
    setIsEnd(false);
  };

  const populationChangeHandler = (event) => {
    setMinPopulation(event.target.value);
    setOffset(0);
    setIsEnd(false);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    props.onSearch(offset, cityNamePrefix, minPopulation);
  };

  return (
    <div className={classes.formWrapper}>
      <h2>{props.type}</h2>
      <form className={classes.form}>
        <div className={classes.input}>
          <div className={classes.control}>
            <label htmlFor="namePrefix">City Name Prefix</label>
            <input
              type="text"
              id="namePrefix"
              value={cityNamePrefix}
              onChange={namePrefixChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="minPopulation">Min Population</label>
            <input
              type="number"
              id="minPopulation"
              value={minPopulation}
              onChange={populationChangeHandler}
            />
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            type="button"
            onClick={searchHandler}
            className={classes.button}
          >
            Search
          </Button>
          <Button
            type="button"
            onClick={changeOffsetHandler}
            className={classes.button}
            disabled={isEnd}
          >
            Show More
          </Button>
        </div>
      </form>
      <span className={classes.info}>
        Showing {offset * 10 + 1} -{" "}
        {(offset + 1) * 10 > props.totalCount
          ? props.totalCount
          : (offset + 1) * 10}{" "}
        out of total {props.totalCount} results
      </span>
    </div>
  );
};

export default FilterForm;
