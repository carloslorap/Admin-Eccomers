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

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`); 
  
  return response.data;
};
const createBlogCategory = async (bcat) => {
  const response = await axios.post(`${base_url}blogcategory/`,bcat,config)
  return response.data;
}
const updateBlogCategory  = async (bcat) => {
  const response = await axios.put(`${base_url}blogcategory/${bcat.id}`, {title:bcat.catData.title}, config);
  return response.data;
};
const getBlogCategory  = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);

  return response.data;
};
const deleteBlogCategory  = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);

  return response.data;
};
 
const bCategoryService = {
    getBlogCategories,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getBlogCategory,
};

export default bCategoryService;
