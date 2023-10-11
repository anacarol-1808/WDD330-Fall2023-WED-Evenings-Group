import { getParam } from "./utils.mjs";
import { productDetails } from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);

// Testing getParams and findProductById
// console.log(getParam("product"))
// console.log(findProductById(getParam("product")))


