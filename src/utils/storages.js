export const setToLocalstorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};
export const getFromLocalstorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};
