import React from "react";
import styles from "../Input/Input.module.css";

const InputRepos = (props) => {
  const handleChange = (e) => {
    let target = e.target.value;
    let filteredRepos = props.repos.filter((item) =>
      item.name.toLowerCase().includes(target)
    );
    props.setInputValue(target);
    props.setFilteredRepos(target === " " ? props.repos : filteredRepos);
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
        placeholder="Search for User's Repositories"
      />
      <input type="submit" className={styles.btn} value="Search" />
    </form>
  );
};

export default InputRepos;
