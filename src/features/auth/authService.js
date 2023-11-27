import axios from "axios";
import { base_url } from "../../utils/base_url";

// Obtén el usuario del localStorage si está disponible
const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    // Verifica si el usuario del localStorage tiene el token antes de usarlo
    Authorization: userFromLocalStorage
      ? `Bearer ${userFromLocalStorage.token}`
      : "",
    Accept: "application/json",
  },
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getoderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
