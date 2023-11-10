import { loginRequest } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, deleteLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = 'so_token';

export async function login(creds, redirect="/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        window.location = redirect;
    } catch (e) {
        console.log(e);
    }
}

export function isTokenValid(token) {
    if (token) {
        const decoded = jwtDecode(token)
        let currDate = new Date();
        if (decoded.exp * 1000 < currDate.getTime()) {
            console.log("Token has expired.");
            return false;
        } else {
            console.log("Valid token!");
            return true;
        }
    } else return false;
}

export function checkLogin() {
    const token = getLocalStorage(tokenKey);
    const valid = isTokenValid(token);

    if(!valid) {
        deleteLocalStorage(tokenKey);
        const currPath = window.location.pathname;
        const newPath = window.location.host + `/login/index.html?redirect="${currPath}"`;
        window.location = newPath;
    } else return token;
}