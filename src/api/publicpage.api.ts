import axios from "./axiosInstance";

export const publicPageApi = {
  getBlog: (params?: { limit?: number; page?: number; category?: string }) => {
    return axios.get(`/v1/public/blog`, { params });
  },
  getBlogDetail: (slug: string) => {
    return axios.get(`/v1/public/blog/${slug}`);
  },
  getFAQ: () => {
    return axios.get(`/v1/public/faqs`);
  },
  getPrivacy: () => {
    return axios.get(`/v1/public/legal/privacy-policy`);
  },
  getTermsofUse: () => {
    return axios.get(`/v1/public/legal/terms-of-use`);
  },
  getConditions: () => {
    return axios.get(`/v1/public/conditions`);
  },
  getConditionsBySlug: (slug: string) => {
    return axios.get(`/v1/public/conditions/${slug}`);
  },
  getAbout: () => {
    return axios.get(`/v1/public/pages/about-us`);
  },
  getCareer: () => {
    return axios.get(`/v1/public/careers`);
  },
  applyForJob: (jobId: string, data: any) => {
    return axios.post(`/v1/public/careers/${jobId}/apply`, data);
  },
  getReview: (p0: { limit: number; offset: number; }) => {
    return axios.get(`/v1/public/reviews/?page=${p0.offset}&limit=${p0.limit}`);
  },
    getProviders: () => {
      return axios.get(`/v1/public/providers/`);
    },
      getProviderById: (id: string) => {
      return axios.get(`/v1/public/providers/${id}`);
    },
  getSiteMap: () => {
    return axios.get(`/v1/public/pages/sitemap/`);
  },
  getHeaders: () => {
    return axios.get(`/v1/public/homepage/header/`);
  },
  getConsent: () => {
    return axios.get(`/v1/public/legal/consent-to-telehealth`);
  },
  getHippaPolicy: () => {
    return axios.get(`/v1/public/legal/hipaa-policy`);
  },
  getDea: () => {
    return axios.get(`/v1/public/legal/dea-rules-update`);
  },
  getEditorialPolicy: () => {
    return axios.get(`/v1/public/legal/editorial-policy`);
  },
  getDashboardAPI: () => {
    return axios.get(`/v1/public/homepage/`);
  },
  getPaymentTerms: () => {
    return axios.get(`/v1/public/legal/payment-terms`);
  },
  getRefundPolicy: () => {
    return axios.get(`/v1/public/legal/refund-policy`);
  },
  getHipaaPolicy: () => {
    return axios.get(`/v1/public/legal/hipaa-policy`);
  },
  sendContact: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return axios.post(`/v1/public/contact`, data);
  },
  getAiConsent: () => {
    return axios.get(`/v1/public/legal/ai-usage-consent`);
  },
  getBookingFlow: () => {
    return axios.get(`/v1/public/booking/flow`);
  },
  postBookingFlow: (data: any) => {
    return axios.post(`/v1/public/appointments/request`, data);
  },
  getProviderBySlug: (slug: string) => {
    return axios.get(`/v1/public/providers?condition=${slug}`);
  },
  
  getServiceBySlug: (slug: string) => {
    return axios.get(`/v1/public/services/${slug}`);
  },
};
