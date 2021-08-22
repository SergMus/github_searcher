import React from "react";
import styles from "../Input/Input.module.css";

const Input = (props) => {
  const handleChange = (e) => {
    props.setInputValue(e.target.value);
  };
  return (
    <form
      className={styles.form}
      //   onSubmit={this.handleSubmit}
    >
      <input
        type="text"
        className={styles.inp}
        value={props.inputValue}
        onChange={handleChange}
        placeholder="Search for Users"
      />
      <input type="submit" className={styles.btn} value="Search" />
    </form>
  );
};

export default Input;
