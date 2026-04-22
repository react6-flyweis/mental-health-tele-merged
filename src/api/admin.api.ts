import axios from "./axiosInstance";
import type { LoginPayload, AuthResponse } from "./types";

export const adminApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await axios.post("/auth/admin/login", payload);
    if (res.data?.token) localStorage.setItem("adminToken", res.data.token);
    return res;
  },

  getDashboard: () => axios.get("/v1/admin/dashboard"),

  getProviders: (params?: Record<string, any>) =>
    axios.get("/v1/admin/providers", { params }),
};
