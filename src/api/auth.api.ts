import axios from "./axiosInstance";
import type { AuthResponse, LoginPayload, RegisterPayload } from "./types";

export const authApi = {
  patientRegister: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const res = await axios.post("/v1/auth/patient/register", payload);
    localStorage.setItem("role", "patient");
    const token = (res as any)?.token ?? (res as any)?.data?.token;
    if (token) localStorage.setItem("patientToken", token);
    return res;
  },

  patientLogin: async (
    payload: LoginPayload & { rememberMe?: boolean },
  ): Promise<AuthResponse> => {
    const res = await axios.post("/v1/auth/patient/login", payload);
    const token = (res as any)?.token ?? (res as any)?.data?.token;
    if (token) localStorage.setItem("patientToken", token);
    return res;
  },

  patientLogout: () => {
    const role = localStorage.getItem("role");
    return axios.post(`/v1/${role?.toLowerCase()}/auth/logout`);
  },

  sendOtp: (payload: { email: string }) =>
    axios.post("/v1/auth/patient/send-otp", payload),

  verifyOtp: (payload: { email: string; otp: string }) =>
    axios.post("/v1/auth/patient/verify-otp", payload),

  forgotPassword: (payload: { email: string }) =>
    axios.post("/v1/auth/patient/forgot-password", payload),

  resetPassword: (payload: {
    email: string;
    otp: string;
    newPassword: string;
  }) => axios.post(`/v1/auth/patient/reset-password`, payload),
};
