import axios from "axios";

// The backend serves everything under /api. In dev, Vite proxies /api to the
// backend (see vite.config.js).
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// ---- Token storage -------------------------------------------------------
// The backend returns { accessToken, refreshToken } and expects the refresh
// token in the request BODY (not a cookie), so we keep both here.
let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
  if (token) localStorage.setItem("accessToken", token);
  else localStorage.removeItem("accessToken");
}
export function getAccessToken() {
  if (!accessToken) accessToken = localStorage.getItem("accessToken");
  return accessToken;
}
export function setRefreshToken(token) {
  if (token) localStorage.setItem("refreshToken", token);
  else localStorage.removeItem("refreshToken");
}
export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
export function clearTokens() {
  setAccessToken(null);
  setRefreshToken(null);
}

// ---- Interceptors --------------------------------------------------------
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On a 401, try one refresh using the stored refresh token, then replay.
let refreshing = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const rt = getRefreshToken();
    if (error.response?.status === 401 && !original._retry && rt) {
      original._retry = true;
      try {
        refreshing =
          refreshing ||
          axios.post("/api/auth/refresh", { refreshToken: rt });
        const { data } = await refreshing;
        refreshing = null;
        const newToken = data?.data?.accessToken;
        if (newToken) {
          setAccessToken(newToken);
          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original);
        }
      } catch (e) {
        refreshing = null;
        clearTokens();
      }
    }
    return Promise.reject(error);
  },
);

export default api;
