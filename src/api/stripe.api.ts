import axios from "./axiosInstance";

export const stripeApi = {
  stripeWebhook: (payload: any) => {
    return axios.post(`/v1/webhooks/stripe`, payload);
  },
  createPaymentIntent: (payload: any) => {
    return axios.post(`/v1/patient/payments/create-payment-intent`, payload);
  },
  setUpPayment: () => {
    return axios.post(`/v1/patient/payment-methods/setup-intent`);
  },
  addPaymentMethod: (payload: { paymentMethodId: string, setAsDefault?: boolean }) => {
    return axios.post(`/v1/patient/payment-methods`, payload);
  },
  getPaymentMethods: () => {
    return axios.get(`/v1/patient/payment-methods`);
  },
  setDefaultPaymentMethod: (paymentMethodId: string) => {
    return axios.post(`/v1/patient/payment-methods/${paymentMethodId}/default`);
  },
  updateDefaultPaymentMethod: (paymentMethodId: string) => {
    return axios.put(`/v1/patient/payment-methods/${paymentMethodId}/default`);
  },
  deletePaymentMethod: (paymentMethodId: string) => {
    return axios.delete(`/v1/patient/payment-methods/${paymentMethodId}`);
  },
  getPaymentMethodDetails: (paymentMethodId: string) => {
    return axios.get(`/v1/patient/payments/${paymentMethodId}`);
  },
   getPaymentMethod: () => {
    return axios.get(`/v1/patient/payments`);
  },
  getPaymentSummary: () => {
    return axios.get(`/v1/patient/payments/summary`);
  },
};
