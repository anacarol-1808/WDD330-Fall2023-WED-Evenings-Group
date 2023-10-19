import { getData } from "./productData.mjs";

function productCardTemplate(product, category) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?category=${category}&product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

export default async function productList(category, selector) {
  const list = await getData(category);
  const output = document.getElementById(selector);
  if (output) {
    renderList(list["Result"], output, category);
  }
}

function renderList(list, output, category) {
  formatHeader(category)
  list.map((product) => {
    output.insertAdjacentHTML(
      "beforeend",
      productCardTemplate(product, category)
    );
  });
}

function formatHeader(category) {
  // Replace hyphens in category with spaces
  let categoryHeader = category.replace(/-/g, " ");
  // Capitalize each word
  categoryHeader = categoryHeader
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
  // Add to HTML
  document.querySelector(
      ".product-list-header"
    ).textContent = `Top Products: ${categoryHeader}`;
}
