import React, { createContext, useContext, useState, useEffect } from "react";
import api from "./services/api"; // Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  // Login: Get access token and set it in the state
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setAccessToken(res.data.accessToken);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Logout: Clear cookie and memory
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setAccessToken(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Refresh access token if expired (using the refresh token)
  const refreshAccessToken = async () => {
    try {
      const res = await api.post("/auth/refresh"); // Send request to refresh token
      setAccessToken(res.data.accessToken); // Set new access token in state
    } catch (err) {
      console.error("Refresh failed:", err);
      setAccessToken(null); // If refresh fails, clear access token
      window.location.href = "/login"; // Redirect to login page if refresh fails
    }
  };

  // Try to refresh the access token on component mount (if expired)
  useEffect(() => {
    refreshAccessToken(); // On mount, attempt to refresh the token
  }, []); // Empty dependency array means this effect runs once on mount

  // Axios request interceptor to attach the access token to requests
  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      config => {
        console.log("config is ",config)
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`; // Attach token to request
        }
        return config; // Return the modified config
      },
      error => Promise.reject(error) // Reject the request in case of error
    );

    return () => {
      api.interceptors.request.eject(requestIntercept); // Clean up interceptor
    };
  }, [accessToken]); // Re-run this effect when accessToken changes

  // Axios response interceptor to handle 401 Unauthorized (token expiration)
  useEffect(() => {
    const responseIntercept = api.interceptors.response.use(
      response => response,  // Successful response handler
      async error => {       // Error response handler
        // If the error is a 401 Unauthorized (access token expired)
        if (error.response && error.response.status === 401) {
          console.log("Access token expired. Refreshing token...");

          try {
            // Attempt to refresh the access token using the refresh token
            await refreshAccessToken();

            // Retry the original request with the new access token
            return api(error.config); // Retry the failed request with the new token
          } catch (refreshError) {
            console.error("Refresh failed:", refreshError);
            // If refresh fails (e.g., refresh token expired), log the user out
            setAccessToken(null);  // Clear the access token from state
            window.location.href = "/login"; // Redirect to login
          }
        }

        return Promise.reject(error);  // Reject the error if it's not a 401
      }
    );

    return () => {
      api.interceptors.response.eject(responseIntercept); // Clean up the response interceptor
    };
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context values
export const useAuth = () => useContext(AuthContext);
