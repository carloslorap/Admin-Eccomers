import axios from "axios";
import { base_url } from "../../utils/base_url";
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`); 
  
  return response.data;
};


const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`,product,config)
  return response.data;
}
const productService = {
    getProducts,
    createProduct,
};

export default productService;
