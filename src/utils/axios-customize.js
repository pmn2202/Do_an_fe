import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseUrl,
});
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const { url } = response.config;
    const data = response.data;
    if (url === "/login" || url === "/register") {
      localStorage.setItem("token", data.token);
    } else if (url === "/logout") {
      localStorage.removeItem("token");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
