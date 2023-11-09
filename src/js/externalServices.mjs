export function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesEror', messsage: jsonResponse};
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
  // it was a promise. Use .then to process the data using converToJson
  const response = await fetch(url, options).then(convertToJson);
    return response;
}
