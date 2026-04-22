import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mr-telerxs-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token =
    localStorage.getItem("patientToken") ||
    localStorage.getItem("providerToken") ||
    localStorage.getItem("adminToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error.response?.data || error.message);
  },
);

export default axiosInstance;
