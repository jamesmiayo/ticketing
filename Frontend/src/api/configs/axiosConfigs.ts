import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosHeaders,
} from "axios";
import { toast } from "react-toastify";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500); 
      localStorage.clear();
      toast.info("Unauthorized: Automatically logged out");
    } else if (error.request) {
      if(error.request.status === 404){
        toast.error("Page not found");
      }else{
        toast.error("Network Error: Unable to reach the server.");
      }
    } else {
      toast.error("Error: " + error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
