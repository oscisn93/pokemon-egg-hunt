import { createUser } from "./firebase";

const button = document.getElementById("begin-button");

button?.addEventListener("click", (ev) => {
  ev.preventDefault();
  const usernameInput = document.getElementById("username");
  const username = usernameInput?.textContent;
  
  if (username) {
    createUser(username);
  } else {
    throw Error("must enter a username");
  }
});