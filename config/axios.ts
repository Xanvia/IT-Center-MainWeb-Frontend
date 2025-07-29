import axios from "axios";
import { getBackendUrl } from "@/utils/env-validation";

// Safely get the backend URL
let baseURL: string;
try {
  baseURL = getBackendUrl();
} catch (error) {
  console.error("Failed to get backend URL:", error);
  // Fallback URL or throw error based on environment
  if (process.env.NODE_ENV === "production") {
    throw new Error("Backend URL not configured for production");
  }
  baseURL = "http://localhost:5100"; // Development fallback
}

const Axios = axios.create({
  baseURL,
  timeout: 15000, // 15s
  headers: {
    "Content-type": "application/json",
  },
});

// Add request interceptor for debugging
Axios.interceptors.request.use(
  (config) => {
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
