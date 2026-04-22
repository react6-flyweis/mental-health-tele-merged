import axios from "./axiosInstance";

export const settingApi = {
  changePassword: (
    payload: { currentPassword: string; newPassword: string },
    role: string,
  ) => axios.put(`/v1/${role}/settings/password`, payload),

  updateNotifications: (payload: any, role: string) => {
    return axios.put(`/v1/${role}/settings/notifications`, payload);
  },
  updateSettings: (payload: any, role: string) => {
    return axios.put(`/v1/${role}/settings/billing`, payload);
  },
  updatePrivacy: (payload: any, role: string) => {
    return axios.put(`/v1/${role}/settings/privacy`, payload);
  },
  getSupport: (role: string, search: string = "") => {
    const params = search ? `/search?q=${search}` : "";
    return axios.get(`/v1/${role}/support${params}`);
  },
  getChatList: (role: string, search: string = "") => {
    const endPoint = `/v1/${role}/chat`;
    const params = search ? `/search?q=${search}` : "";
    return axios.get(`${endPoint}${params}`);
  },
  getChatMessage: (role: string, chatId: string) => {
    return axios.get(`/v1/${role}/chat/${chatId}`);
  },
  sendMessage: (payload: any, role: string, chatId: string) => {
    return axios.post(`/v1/${role}/chat/${chatId}/message`, payload);
  },
  getRoleProfile: (role: string) => axios.get(`/v1/${role}/profile`),
};
