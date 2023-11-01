import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");
const selector = "productList";
productList(category, selector);
loadHeaderFooter();

let products = [];

document.addEventListener("DOMContentLoaded", function () {

  function renderProductList() {
      const productListBox = document.getElementById("productList");
      // Clear existing products
      productListBox.innerHTML = ""; 
      let productlistFilter = productList.filter((product) => {
        if (searchValue == null || product.name.includes (searchValue)) {
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
    
  // Sort products by name
  function sortProductsByName() {
      console.log("Products before sorting:", products);
      products.sort((a, b) => a.name.localeCompare(b.name));
      console.log("Products after sorting:", products);
      renderProductList();
  }

  // Sort products by price
  function sortProductsByPrice() {
    products.sort((a, b) => a.price - b.price);
    renderProductList();
  }
  // Add event listeners to sorting buttons
  document.getElementById("sortByNameButton").addEventListener("click", sortProductsByName);
  document.getElementById("sortByPriceButton").addEventListener("click", sortProductsByPrice);

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
    productList(category, selector, searchValue);
}); 