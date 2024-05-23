import axios from "axios";

const baseUrl = "http://localhost:2000"

const api = axios.create({
    baseURL:baseUrl
});


export default api;

export function injectAuthInterceptors() {
  api.interceptors.request.use((config) => {
  
    const token = localStorage.getItem("jwt_token");
  
  
  
    if (config?.headers && token) {
      config.headers["token"] = token;
    }
    return config;
  });
  
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {}
  
      return Promise.reject(error);
    },
  )
}