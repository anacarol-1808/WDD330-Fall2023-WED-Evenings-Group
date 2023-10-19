// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// Remove one item from local storage
export function deleteLocalStorage(key){
  localStorage.removeItem(key);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get(param)
  return paramValue;
}


export async function loadHeaderFooter() {
  const output = document.querySelector("body");
  await renderWithTemplate("afterbegin", '../public/partials/header.html', output);
  await renderWithTemplate("beforeend", '../public/partials/footer.html', output);
  populateCartCount();
};

export function populateCartCount() {
    // showing items added to the cart on the bag when the page loads
    let cartCount;
    let cartBadgeCount = document.getElementById("cart-count");
    let cartBadgeIcon = document.getElementById("cart-badge");

    let localStorageCartCount = JSON.parse(localStorage.getItem("so-cart"));
    if (localStorageCartCount) {
        cartCount = localStorageCartCount.length;
        cartBadgeCount.innerHTML = cartCount;

        if (cartCount > 0) {
            cartBadgeIcon.style.display = "block";
        }
    } else {
      cartBadgeIcon.style.display = "none";
    }
}

async function loadTemplate (path) {
  const response = await fetch(path);
  return response.text();
};

async function renderWithTemplate(position, path, output) {
  const outputStr = await loadTemplate(path);
    output.insertAdjacentHTML(position, outputStr);
}