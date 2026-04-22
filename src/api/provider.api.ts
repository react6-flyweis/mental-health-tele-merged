import axios from "./axiosInstance";
import type { LoginPayload, AuthResponse } from "./types";

export const providerApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await axios.post("/v1/provider/auth/login", payload);
    const token = (res as any)?.token ?? (res as any)?.data?.token;
    if (token) localStorage.setItem("providerToken", token);
    return res;
  },

  getProfile: () => axios.get("/v1/provider/profile"),

  getAppointments: (params?: Record<string, any>) =>
    axios.get("/v1/provider/appointments", { params }),

  confirmAppointment: (id: string) =>
    axios.put(`/v1/provider/appointments/${id}/confirm`),
};
