import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { getOrders } from "./externalServices.mjs";

loadHeaderFooter();

console.log(getOrders(getLocalStorage("so_token").accessToken));
