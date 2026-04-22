import axios from "./axiosInstance";

export const dashboardApi = {
  getDashboardData: (role = "patient") => {
    return axios.get(`/v1/${role}/dashboard`);
  },
  getHomepageData: () => {
    return axios.get(`/v1/public/homepage`);
  },
  getNotification: (params?: { filter?: string; page?: number; limit?: number }) => {
    return axios.get(`/v1/patient/notifications`, {
      params: {
        filter: params?.filter || "all",
        page: params?.page || 1,
        limit: params?.limit || 20,
      },
    });
  },
  getNotificationRead: (notificationId: string) => {
    return axios.put(`/v1/patient/notifications/${notificationId}/read`);
  },
  getNotificationDelete: (notificationId: string) => {
    return axios.delete(`/v1/patient/notifications/${notificationId}`);
  },
  getNotificationReadAll: () => {
    return axios.put(`/v1/patient/notifications/read-all`);
  },
  getSessionData: (role = "patient", search?: string) => {
    return axios.get(`/v1/${role}/sessions`, {
      params: {
        search: search,
      },
    });
  },
  postSessionData: (role = "patient", payload: any) => {
    return axios.post(`/v1/${role}/sessions/${payload.sessionId}/join`, payload);
  },
  getAppointments: (role = "patient", search?: string) => {
    return axios.get(`/v1/${role}/appointments`, {
      params: {
        search: search,
      },
    });
  },
  getActivePrescriptions: (role = "patient", search?: string) => {
    return axios.get(`/v1/${role}/prescriptions`, {
      params: {
        search,
      },
    });
  },
  getMentalPlans: (role = "patient") => {
    return axios.get(`/v1/${role}/plans`);
  },
 getMyProviders: (role = "patient", params?: { page?: number; limit?: number }) => {
  return axios.get(`/v1/${role}/providers/my-providers`, { params })
},
  getProviders: (role = "patient", params?: { page?: number; limit?: number }) => {
    return axios.get(`/v1/${role}/providers`, { params })
  },
  getMoodOptions: (role = "patient") => {
    return axios.get(`/v1/${role}/mood/options`);
  },
  getMoodHistory: (role = "patient") => {
    return axios.get(`/v1/${role}/mood/`);
  },
  postRequestRefill: (role = "patient", prescriptionId: string, payload: any) => {
    return axios.post(
      `/v1/${role}/prescriptions/${prescriptionId}/request-refill`,
      payload,
    );
  },
  getPayments: (role = "patient", search?: string) => {
    return axios.get(`/v1/${role}/payments`, {
      params: {
        search,
      },
    });
  },
  postMoodApi: (role = "patient", payload: any) => {
    return axios.post(`/v1/${role}/mood`, payload);
  },
  getPaymentSummary: (role = "patient", search?: string) => {
    return axios.get(`/v1/${role}/payments/summary`, {
      params: {
        search,
      },
    });
  },
  getExercise: (role = "patient") => {
    return axios.get(`/v1/${role}/breathing`);
  },
  getPaymentById: (role = "patient", paymentId: string) => {
    return axios.get(`/v1/${role}/payments/${paymentId}`);
  },
  getPrefillCount: (role = "patient") => {
    return axios.get(`/v1/${role}/prescriptions/counts`);
  },
  getCardsApi: (role = "patient") => {
    return axios.get(`/v1/${role}/payment-methods`);
  },
  postAddCardApi: (role = "patient", payload: any) => {
    return axios.post(`/v1/${role}/payment-methods`, payload);
  },
  defaultCardApi: (role = "patient", cardId: string) => {
    return axios.put(`/v1/${role}/payment-methods/${cardId}/default`);
  },
  deleteCardApi: (role = "patient", cardId: string) => {
    return axios.delete(`/v1/${role}/payment-methods/${cardId}`);
  },
  downloadPrescription: (role = "patient", prescriptionId: string) => {
    return axios.get(`/v1/${role}/prescriptions/${prescriptionId}/download`, {
      responseType: "arraybuffer",
    });
  },
  getAiConsent: () => {
    return axios.get(`/v1/public/legal/ai-usage-consent`);
  },
  getMessageProvider: (role = "patient", payload: any) => {
    return axios.post(`/v1/${role}/chat/start`, payload);
  },
  postAdminMessage: (role = "patient") => {
    return axios.post(`/v1/${role}/chat/start-admin`);
  },
  
  sendSupportReply: (role = "patient", ticketId: string, payload: any) => {
    return axios.post(`/v1/${role}/support/${ticketId}/reply`, payload);
  },
  getProviderAvailability: (providerId: string, date: string) => {
    return axios.get(`/v1/public/providers/${providerId}/availability?date=${date}`);
  },
};
