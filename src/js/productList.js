import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
const selector = "productList";
productList(category, selector);
