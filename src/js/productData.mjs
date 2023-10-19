function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}



export function getData(category) {
  const baseURL = import.meta.env.VITE_SERVER_URL
  return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id, category) {
  const products = await getData(category);
  return products["Result"].find((item) => item.Id === id);
}
