import { getData } from "./productData.mjs"

function productCardTemplate (product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`
};

export default async function productList(category, selector) {
    const list = await getData(category);
    const output = document.getElementById(selector);
    if (output) {
      renderList(list["Result"], output);
    }
};

function renderList(list, output) {
    list.map((product)=> {
        output.insertAdjacentHTML("beforeend", productCardTemplate(product))  
    })
}