import axios from "axios";
import queryString from "query-string";
const apiConfig = {
  baseURL: "https://ex02-19127186-be.herokuapp.com/",
  // baseURL: "http://localhost:3001/",
  token: localStorage.getItem("token") || "",
};

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
    // token: apiConfig.token,
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.token = token;
  }

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }
  }
);

export { axiosClient };
