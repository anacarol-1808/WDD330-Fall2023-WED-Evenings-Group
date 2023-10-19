import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");
const selector = "productList";
productList(category, selector);
loadHeaderFooter();
