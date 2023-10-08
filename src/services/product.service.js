import axios from "axios";

export const getProducts = async (callback) => {
  await axios
    .get("https://fakestoreapi.com/products")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err);
    });
};
