import React, { useEffect, useState } from "react";
import { getFromLocalstorage, setToLocalstorage } from "../../utils/storages";
import Header from "../Header/Header";
import Input from "../Input/Input";
import styles from "../ProfileDisplay/ProfileDisplay.module.css";

const ProfileDisplay = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [reposCount, setReposCount] = useState(users);

  const calculateRepos = async (users) => {
    const arr = await Promise.all(
      users.map(async (value) => {
        let data = await fetch(`https://api.github.com/users/${value.login}`);
        let json = await data.json();
        let arrRepos = json.public_repos;
        return arrRepos;
      })
    );
    let c = users.map((item, id) => {
      let b = arr[id];
      return { ...item, repos: b };
    });
    setReposCount(c);
    setToLocalstorage("all_users_with_repos", c);
  };

  useEffect(() => {
    calculateRepos(users);
  }, [users]);

  useEffect(() => {
    let usersFromStorage = getFromLocalstorage("all_users");
    if (usersFromStorage) {
      return setUsers(usersFromStorage);
    }
  }, []);

  useEffect(() => {
    let usersFromStorage = getFromLocalstorage("all_users_with_repos");
    if (usersFromStorage) {
      return setReposCount(usersFromStorage);
    }
  }, []);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setIsLoading(true);

    fetch(`https://api.github.com/search/users?q=${inputValue}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.items);
        setIsLoading(false);
        setToLocalstorage("all_users", data.items);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(true);
      });
  }, [inputValue]);

  const aboutUser = (e) => {
    let user = e.target.childNodes[0].textContent;

    fetch(`https://api.github.com/users/${user}`)
      .then((response) => response.json())
      .then((data) => {
        props.updateUser(data);
        setIsLoading(false);
        setToLocalstorage("currentUser", data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(true);
      });
  };
  return (
    <div className={styles.container}>
      <Header />
      <Input inputValue={inputValue} setInputValue={setInputValue} />
      {isLoading && <div>...Loading!!!</div>}
      {error && <div>...Something go wrong. Please, try again later!</div>}
      <div className={styles.cards_list}>
        {reposCount &&
          reposCount.map((user) => {
            return (
              <div
                className={styles.user_card}
                key={user.id}
                onClick={aboutUser}
              >
                <div className={styles.user_info}>
                  <div className={styles.image_box}>
                    <img
                      src={
                        user.avatar_url
                          ? user.avatar_url
                          : "https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png"
                      }
                      alt={user.login}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.user_name}>{user.login}</div>
                </div>
                <div className={styles.user_repos}>Repo: {user.repos}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProfileDisplay;
