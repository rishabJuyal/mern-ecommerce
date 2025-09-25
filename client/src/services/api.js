import axios from "axios";
// import  store  from "../store";
import { refreshToken, clearAuth } from "../store/authSlice";

const api = axios.create({
  baseURL: "http://192.168.147.127:5000/api",
  withCredentials: true, // for refresh token in httpOnly cookie
});
let store;

export const injectStore = (_store) => {
  store = _store;
};

export const getStore = () => store;

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {
      originalRequest._retry = true;

      try {
        const action = await store.dispatch(refreshToken());
        const newToken = action.payload;

        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        store.dispatch(clearAuth());
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
