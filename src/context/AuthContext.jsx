import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/auth.js";
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  clearTokens,
} from "../api/client.js";

const AuthContext = createContext(null);

// The backend wraps everything in { success, message, data: {...} }.
const getData = (res) => res?.data ?? res;
const extractUser = (res) => getData(res)?.user || null;
const extractAccess = (res) => getData(res)?.accessToken;
const extractRefresh = (res) => getData(res)?.refreshToken;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getAccessToken()) {
      authApi
        .me()
        .then((res) => setUser(extractUser(res)))
        .catch(() => clearTokens())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const storeTokens = (res) => {
    const at = extractAccess(res);
    const rt = extractRefresh(res);
    if (at) setAccessToken(at);
    if (rt) setRefreshToken(rt);
  };

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    storeTokens(res);
    const me = extractUser(res) || (await authApi.me().then(extractUser));
    setUser(me);
    return me;
  };

  const register = async (payload) => {
    const res = await authApi.register(payload);
    storeTokens(res);
    setUser(extractUser(res));
    return res;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (_) {
      /* ignore */
    }
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
