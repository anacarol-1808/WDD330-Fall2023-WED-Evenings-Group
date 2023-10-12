import {
  getLocalStorage,
  setLocalStorage,
  deleteLocalStorage,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // Only render if we have items in the cart
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    // Add remove event listeners
    addRemoveListeners();
  } else {
    // If nothing is in the cart, empty product list and add message redirecting user
    document.querySelector(".product-list").replaceChildren();
    document.querySelector(".cart-header").innerHTML = "Your cart is empty";
    let node = document.createElement("a");
    let nodeMessage = document.createTextNode(
      "Click here to browse our products"
    );
    node.href = "../";
    node.appendChild(nodeMessage);
    document.querySelector(".products").appendChild(node);
  }
  // Show total cost
  showTotal(cartItems);
}

function showTotal(cartItems) {
  const cart = document.getElementById("cart-footer");
  if (cartItems) {
    // Calculate total items
    const total = cartItems
      .reduce((result, cartItem) => result + cartItem.ListPrice, 0)
      .toFixed(2);
    // Select cart total from html and update it with total price
    document.getElementById("cart-total").innerHTML = `Total <b>$${total}</b>`;
    // Select cart footer and unhide it
    cart.classList.remove("hide");
  } else {
    cart.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `
  <li>
  <a><span class="cart-remove" data-id="${item.Id}">X</span></a>
  <div class='cart-card divder'>
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
  </div>
</li>`;

  return newItem;
}

function addRemoveListeners() {
  const deleteLink = document.querySelectorAll(".cart-remove");
  for (let i = 0; i < deleteLink.length; i++) {
    deleteLink[i].addEventListener("click", removeFromCart);
  }
}

function removeFromCart() {
  const itemId = parseInt(this.dataset.id);
  const cartItems = getLocalStorage("so-cart");

  for (let i = 0; i < cartItems.length; i++) {
    if ((cartItems[i].Id = itemId)) {
      cartItems.splice(i, 1);
      break;
    }
  }

  if (cartItems.length > 0) {
    setLocalStorage("so-cart", cartItems);
  } else {
    deleteLocalStorage("so-cart");
  }

  renderCartContents();
}

renderCartContents();
