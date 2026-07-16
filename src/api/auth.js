import api, { getRefreshToken } from "./client.js";

export const authApi = {
  register: (payload) => api.post("/auth/register", payload).then((r) => r.data),
  login: (payload) => api.post("/auth/login", payload).then((r) => r.data),
  logout: () =>
    api.post("/auth/logout", { refreshToken: getRefreshToken() }).then((r) => r.data),
  refresh: () =>
    api.post("/auth/refresh", { refreshToken: getRefreshToken() }).then((r) => r.data),
  me: () => api.get("/auth/me").then((r) => r.data),
  updateProfile: (payload) => api.put("/auth/profile", payload).then((r) => r.data),
  changePassword: (payload) =>
    api.put("/auth/change-password", payload).then((r) => r.data),
};
