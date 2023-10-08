import axios from "axios";
import jwtDecode from "jwt-decode";

export const login = async (data, callback) => {
  await axios
    .post("https://fakestoreapi.com/auth/login", data)
    .then((res) => {
      callback(true, res.data.token);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getUser = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};
