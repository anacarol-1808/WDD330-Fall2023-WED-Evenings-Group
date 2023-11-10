import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");
const selector = "productList";
productList(category, selector);
loadHeaderFooter();

let products = [];

// Initial sort order is ascending
let sortAscending = true;

document.addEventListener("DOMContentLoaded", function () {
  const sortButton = document.getElementById("sortByPriceButton");

  function renderProductList() {
    const productListBox = document.getElementById("productList");
    // Clear existing products
    productListBox.innerHTML = "";
    let productlistFilter = productList.filter((product) => {
      if (searchValue == null || product.name.includes(searchValue)) {
        return true;
      } else {
        return false;
      }
    });
    productlistFilter.forEach((product) => {
      const listItem = document.createElement("li");
      // or display other product information
      listItem.textContent = product.name;
      productListBox.appendChild(listItem);
    });
  }

  function updateSortButtonText() {
    // update the sorting button text based on the current sorting state
    sortButton.textContent = sortAscending
      ? "Sort by Price: Low to High"
      : "Sort by Price: High to Low";
  }

  // Initial text for the sorting button
  updateSortButtonText();

  sortButton.addEventListener("click", () => {
    // Toggle the sorting order
    sortAscending = !sortAscending;
    // Update the sorting button text
    updateSortButtonText();
    // Call the productList function with the updated sorting flag
    productList(category, selector, null, sortAscending);
  });
});

function searchResult(value) {
  // making a request to the API with user's search input/value
  console.log("Search value:", value);
  getData(`products/search/${value}`)
    .then((data) => {
      // this is where the new search result will be displayed.
      const productListContainer = document.getElementById("productList");
      // clearing existing products to place the new search result.
      productListContainer.innerHTML = "";

      // goes through list of products received from the API.
      data.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.textContent = product.name;
        productListContainer.append(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
}

document.getElementById("searchForm").addEventListener("submit", (e) => {
  // preventDefault avoids the default form submission behavior
  // like page refresh or take you to the new page.
  e.preventDefault();
  // calling a function here to fetch and display the actual result.
  const searchValue = document.getElementById("searchInput").value;
  productList(category, selector, searchValue, sortAscending);
});
