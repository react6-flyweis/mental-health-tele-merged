import axios from "./axiosInstance"
import { AppointmentPayload } from "./types"

export const patientApi = {
  getProfile: () =>
    axios.get("/v1/patient/profile"),

  updateProfile: (data: any) =>
    axios.put("/v1/patient/profile", data),

  deleteAccount: () =>{
     const role = localStorage.getItem("role")
     return axios.delete(`${role=="Patient"?"/v1/patient/account":"/v1/provider/profile/account"}`)
  },

  getDashboard: () =>
    axios.get("/v1/patient/dashboard"),

  getAppointments: (params?: Record<string, any>) =>
    axios.get("/v1/patient/appointments", { params }),

  bookAppointment: (data: AppointmentPayload) =>
    axios.post("/v1/patient/appointments/book", data),

  getAppointmentById: (id: string) =>
    axios.get(`/v1/patient/appointments/${id}`),

  rescheduleAppointment: (id: string, data: { date: string; time: string }) =>
    axios.put(`/v1/patient/appointments/${id}/reschedule`, data),

  cancelAppointment: (id: string) =>
    axios.put(`/v1/patient/appointments/${id}/cancel`),

  getProviders: (params?: Record<string, any>) =>
    axios.get("/v1/patient/providers", { params }),

  getProviderById: (id: string) =>
    axios.get(`/v1/patient/providers/${id}`),
  getRescheduleById: (id: string, data: { date: string; time: string }) =>
    axios.post(`/v1/patient/appointments/${id}/reschedule`, data),
  
}