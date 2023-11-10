import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();
const redirect = getParam("redirect");

document.forms["loginForm"].addEventListener("submit", (e) => {
  e.preventDefault();
  const creds = {
    email: document.forms["loginForm"].elements["username"].value,
    password: document.forms["loginForm"].elements["password"].value,
  };
  login(creds, redirect);
});
