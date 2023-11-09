import { getProductsByCategory } from "./externalServices.mjs";

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
export default async function productList(category, selector, searchValue, sortAscending = true) {
  const list = await getProductsByCategory(category);
  const output = document.getElementById(selector);
  if (output) {
    renderList(list["Result"], output, category, searchValue, sortAscending);
  }
}

function renderList(list, output, category, searchValue, sortAscending) {
  formatHeader(category);
  output.innerHTML = "";

  // convert lowercase for a caseinsensitive comparison if it's not null
  searchValue = searchValue != null ? searchValue.toLowerCase() : null;

  // filter list based on case insensitive comparison
  let filteredProducts = list.filter((product) => {
    // Convert product name to lowercase
    let productNameLower = product.Name.toLowerCase(); 
    // Check with the lowercase search value
    return searchValue == null || productNameLower.includes(searchValue); 
  });
 // Sort the filtered product list by price
 if (!sortAscending) {
  // Sort in descending order
  filteredProducts.sort((a, b) => parseFloat(b.FinalPrice) - parseFloat(a.FinalPrice));
} 
 else {
  // Sort in ascending order
  filteredProducts.sort((a, b) => parseFloat(a.FinalPrice) - parseFloat(b.FinalPrice)); 
}
  // Map over the filtered (and possibly sorted) list to create HTML elements
  filteredProducts.forEach((product) => {
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
