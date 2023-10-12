import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  showTotal(cartItems);
}

function showTotal(cartItems) {
  // If there is something in the cart
  if (cartItems) {
    // Calculate total items
    const total = cartItems.reduce(
      (result, cartItem) => result + cartItem.ListPrice,
      0
    );
    // Select cart total from html and update it with total price
    document.getElementById("cart-total").innerHTML += ` <b>${total}</b>`;
    // Select cart footer and unhide it
    document.getElementById("cart-footer").classList.remove("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
