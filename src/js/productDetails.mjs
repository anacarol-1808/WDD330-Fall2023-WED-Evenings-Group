import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export async function productDetails(productId) {
  let productData = await findProductById(productId);
  renderProductDetails(productData);
}

function renderProductDetails(productData) {
  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);

  console.log(productData);
  
  document.getElementById("brandName").textContent = productData.Brand.Name;
  document.getElementById("productName").textContent = productData.NameWithoutBrand;

  // Image
  const img = document.getElementById("productImg");
  img.setAttribute("src", productData.Image);
  img.setAttribute("alt", productData.Name);

  document.getElementById("finalPrice").textContent = "$" + productData.FinalPrice;
  document.getElementById("savingsPercent").textContent = "SAVE " + Math.floor(((productData.SuggestedRetailPrice - productData.FinalPrice) / productData.SuggestedRetailPrice) * 10000) / 100 + "%";
  document.getElementById("suggestedRetailPrice").textContent = "$" + productData.SuggestedRetailPrice;
  document.getElementById("productColor").textContent = productData.Colors[0].ColorName;
  document.getElementById("productDescription").textContent = productData.DescriptionHtmlSimple;

  // Calculate and display the discount amount
  
  const finalPrice = productData.FinalPrice;
  const listPrice = productData.ListPrice;
  const discountAmount = listPrice - finalPrice;

  if (discountAmount > 0) {
    const discountElement = document.createElement("div");
    discountElement.textContent = `Discount: $${discountAmount.toFixed(2)}`;
    document.getElementById("productPrice").appendChild(discountElement);
  }
}

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    cartItems.push(product);
  } else {
    cartItems = [product];
  }
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  3;
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}


