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


export function loadHeaderFooter() {
  const output = document.querySelector("body");
  renderWithTemplate("afterbegin", '../public/partials/header.html', output);
  renderWithTemplate("beforeend", '../public/partials/footer.html', output);
};

async function loadTemplate (path) {
  const response = await fetch(path);
  return response.text();
};

async function renderWithTemplate(position, path, output) {
  const outputStr = await loadTemplate(path);
    output.insertAdjacentHTML(position, outputStr);
}