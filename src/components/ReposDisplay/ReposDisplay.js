import React, { useEffect, useRef, useState } from "react";
import { getFromLocalstorage, setToLocalstorage } from "../../utils/storages";
import Header from "../Header/Header";
import InputRepos from "../Input/InputRepos";
import styles from "../ReposDisplay/ReposDisplay.module.css";

const ReposDisplay = ({ currentUser, userFromStorage }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);

  let userFromLocalstorage = getFromLocalstorage("currentUser");
  let reposFromLocalstorage = getFromLocalstorage("repos");
  const savedEl = useRef(userFromLocalstorage);
  const savedRep = useRef(reposFromLocalstorage);

  useEffect(() => {
    if (
      (savedEl.current === null || savedEl.current.length === 0) &&
      (savedRep.current === null || savedRep.current.length === 0)
    ) {
      return;
    }
    userFromStorage(savedEl.current);
    setFilteredRepos(savedRep.current);
    setRepos(savedRep.current);
  }, [userFromStorage]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${currentUser.login}/repos?per_page=10`)
      .then((response) => response.json())
      .then((data) => {
        setRepos(data);
        setFilteredRepos(data);
        setIsLoading(false);
        setToLocalstorage("repos", data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(true);
      });
  }, [currentUser.login, currentUser]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.user_infoCard}>
        <div className={styles.card_avatar}>
          <img
            src={
              currentUser.avatar_url
                ? currentUser.avatar_url
                : "https://mpng.subpng.com/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg"
            }
            alt=""
            style={{ width: "100%", minHeight: "200px" }}
          />
          <h4>
            <b>{currentUser.name}</b>
          </h4>
          <p>{currentUser.bio}</p>
        </div>
        <div className={styles.card_aside}>
          <div className={styles.card_header}>
            <div className={[styles.desc, styles.desc1].join(" ")}>
              followers {currentUser.followers}
            </div>
            <div className={[styles.desc, styles.desc2].join(" ")}>
              following {currentUser.following}
            </div>
            <div className={[styles.desc, styles.desc3].join(" ")}>
              repos {currentUser.public_repos}
            </div>
          </div>
          <div className={styles.card_content}>
            <div className={styles.card_description}>
              <div className={styles.card_rows}>
                UserName: &nbsp;<b>{currentUser.login}</b>
              </div>
              <div className={styles.card_rows}>Email: {currentUser.email}</div>
              <div className={styles.card_rows}>
                Location: {currentUser.location}
              </div>
              <div className={styles.card_rows}>
                Join Date:{" "}
                {currentUser.created_at && currentUser.created_at.slice(0, 10)}
              </div>
              <div className={styles.card_rows}>
                Profile URL:&nbsp;
                <a href={currentUser.html_url}>{currentUser.html_url}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InputRepos
        inputValue={inputValue}
        setInputValue={setInputValue}
        repos={repos}
        filteredRepos={filteredRepos}
        setFilteredRepos={setFilteredRepos}
      />
      <div className={styles.list_wrapper}>
        {isLoading && <div>...Loading!!!</div>}
        {error && <div>...Something go wrong. Please, try again later!</div>}
        <div className={styles.cards_list}>
          {filteredRepos &&
            filteredRepos.map((item) => {
              return (
                <div
                  className={styles.user_card}
                  key={item.id}
                  onClick={() => (window.location.href = item.html_url)}
                >
                  <div className={styles.user_info}>
                    <div className={styles.user_name}>{item.name}</div>
                  </div>
                  <div className={styles.user_repos}>
                    <div
                      className={styles.thumb}
                      style={{ marginBottom: "4px" }}
                    >
                      <div className={styles.thumb_text}>
                        <i
                          className="fas fa-code-branch"
                          style={{ paddingRight: "5px" }}
                        ></i>
                        Forks
                      </div>
                      <div className={styles.thumb_num}>{item.forks}</div>
                    </div>
                    <div className={styles.thumb} style={{ marginTop: "4px" }}>
                      <div className={styles.thumb_text}>
                        <i
                          className="far fa-star"
                          style={{ paddingRight: "5px" }}
                        ></i>
                        Star&nbsp;
                      </div>
                      <div className={styles.thumb_num}>
                        {item.stargazers_count}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ReposDisplay;
