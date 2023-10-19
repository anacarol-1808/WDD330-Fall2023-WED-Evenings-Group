import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = "tents";
const selector = "productList";
productList(category, selector);

// showing items added to the cart on the bag when the page loads
let cartCount;
let cartBadgeCount = document.getElementById("cart-count");
let cartBadgeIcon = document.getElementById("cart-badge");

let localStorageCartCount = JSON.parse(localStorage.getItem("so-cart"));
cartCount = localStorageCartCount.length;
cartBadgeCount.innerHTML = cartCount;

if (cartCount > 0) {
  cartBadgeIcon.style.display = "block";
}
