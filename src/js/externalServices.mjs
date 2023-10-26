function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}



export function getProductsByCategory(category) {
  const baseURL = import.meta.env.VITE_SERVER_URL
  return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id, category) {
  const products = await getProductsByCategory(category);
  return products["Result"].find((item) => item.Id === id);
}

export async function checkout(payload){
  const url = import.meta.env.VITE_SERVER_URL + "checkout";
  const options = {
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }
  const response = await fetch(url, options)
  console.log(response)
}
