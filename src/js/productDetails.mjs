import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export async function productDetails(productId, productCategory) {
  let productData = await findProductById(productId, productCategory);
  renderProductDetails(productData);
}

function renderProductDetails(productData) {
  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
  
  document.getElementById("brandName").textContent = productData.Brand.Name;
  document.getElementById("productName").textContent = productData.NameWithoutBrand;

  // Image
  const img = document.getElementById("productImg");
  img.setAttribute("src", productData.Images.PrimaryLarge);
  img.setAttribute("alt", productData.Name);

  document.getElementById("finalPrice").textContent = "$" + productData.FinalPrice;
  document.getElementById("savingsPercent").textContent = "SAVE " + Math.floor(((productData.SuggestedRetailPrice - productData.FinalPrice) / productData.SuggestedRetailPrice) * 10000) / 100 + "%";
  document.getElementById("suggestedRetailPrice").textContent = "$" + productData.SuggestedRetailPrice;
  document.getElementById("productColor").textContent = productData.Colors[0].ColorName;
  document.getElementById("productDescription").innerHTML = productData.DescriptionHtmlSimple;

  // Calculate and display the discount amount
  
  const finalPrice = productData.FinalPrice;
  const listPrice = productData.ListPrice;
  const discountAmount = listPrice - finalPrice;

  if (discountAmount > 0) {
    const discountElement = document.createElement("div");
    discountElement.textContent = `Discount: $${discountAmount.toFixed(2)}`;
    document.getElementById("productPrice").appendChild(discountElement);
  }

  // Add to Cart Button
  document.getElementById("addToCart").dataset.id = productData.Id
  document.getElementById("addToCart").dataset.category = productData.Category
}

function addProductToCart(product) {
  console.log(product)
  let cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    let match = cartItems.filter((cartItem) => cartItem.Id == product.Id)[0];
    if (match) {
      cartItems[cartItems.indexOf(match)].qty++;
    } else {
      product.qty = 1;
      cartItems.push(product);
    }
  } else {
    cartItems = [product];
  }
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const category = e.target.dataset.category
  const id = e.target.dataset.id
  const product = await findProductById(id,category);
  
  addProductToCart(product);

  
// showing items added to the cart on the bag when the btn is pressed
let cartCount;
let cartBadgeCount = document.getElementById("cart-count");
let cartBadgeIcon = document.getElementById("cart-badge");

let localStorageCartCount = JSON.parse(localStorage.getItem("so-cart"));
cartCount = localStorageCartCount.length;
cartBadgeCount.innerHTML = cartCount;

if (cartCount > 0) {
    cartBadgeIcon.style.display = "block";
};

}


