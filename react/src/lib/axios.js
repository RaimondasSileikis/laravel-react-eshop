import axios from "axios";
import router from "../router";
import { LOCAL_USER_TOKEN } from "../constants";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(LOCAL_USER_TOKEN)}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(LOCAL_USER_TOKEN);
      router.navigate("/login");
      return error;
    }
    throw error;
  }
);

export default axiosClient;
