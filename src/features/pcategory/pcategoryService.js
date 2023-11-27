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

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);
  return response.data;
};
const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};
const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);

  return response.data;
};
const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
     { title: category.categoryData.title },
    config
  );
  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pCategoryService;