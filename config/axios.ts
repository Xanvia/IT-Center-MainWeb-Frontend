import axios from "axios";
import {
  getBackendUrlWithFallback,
  debugEnvironmentVariables,
} from "@/utils/env-debug";

// Create axios instance with dynamic baseURL
const Axios = axios.create({
  timeout: 15000, // 15s
  headers: {
    "Content-type": "application/json",
  },
});

// Add request interceptor to set baseURL dynamically
Axios.interceptors.request.use(
  (config) => {
    // Set baseURL dynamically if not already set
    if (!config.baseURL) {
      try {
        config.baseURL = getBackendUrlWithFallback();
      } catch (error) {
        console.error("Failed to get backend URL:", error);
        debugEnvironmentVariables();

        // Absolute fallback
        if (typeof window !== "undefined") {
          const protocol = window.location.protocol;
          const hostname = window.location.hostname;
          config.baseURL = `${protocol}//${hostname}:5100`;
        } else {
          config.baseURL = "http://localhost:5100";
        }
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`Making request to: ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout:", error.config?.url);
    } else if (error.response) {
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default Axios;
