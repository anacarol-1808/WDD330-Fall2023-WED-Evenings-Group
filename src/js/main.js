import { loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";
import buildAlerts from "./alerts.mjs";

buildAlerts();
loadHeaderFooter();

const category = "tents";
const selector = "productList";
productList(category, selector);