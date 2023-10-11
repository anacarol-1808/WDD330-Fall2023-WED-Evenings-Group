import { getParam } from "./utils.mjs";
import { productDetails } from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);

// Testing getParams and findProductById
// console.log(getParam("product"))
// console.log(findProductById(getParam("product")))


let cartCount = 0;

const addToCartBtn = document.getElementById('addToCart');
const cartBadge = document.getElementById('cart-count');

addToCartBtn.addEventListener('click', (event) => {
    cartCount++;

    setTimeout((e) => {
        cartBadge.innerHTML = cartCount;
    }, 500);

    
})


