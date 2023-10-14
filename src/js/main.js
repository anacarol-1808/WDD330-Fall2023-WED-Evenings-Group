import productList from "./productList.mjs";
import buildAlerts from "./alerts.mjs";
buildAlerts();

const category = "tents";
const selector = "productList";
productList(category, selector);

// counting items added to the cart
let cartCount = 0;

//const addToCartBtn = document.getElementById('addToCart');
const cartBadge = document.getElementById("cart-count");

let localStorageCartCount = JSON.parse(localStorage.getItem("so-cart"));
cartCount = localStorageCartCount.length;

cartBadge.innerHTML = cartCount;
