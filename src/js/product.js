import { getParam } from "./utils.mjs";
import { productDetails } from "./productDetails.mjs";

const productId = getParam("product");
const productCategory = getParam("category");
productDetails(productId, productCategory);
