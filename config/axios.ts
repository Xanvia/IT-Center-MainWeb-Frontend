import axios from "axios";

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
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!baseURL) {
        // Only throw error in runtime, not during build
        if (
          typeof window !== "undefined" ||
          process.env.NODE_ENV === "development"
        ) {
          throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
        }
        // During build or server-side, use a placeholder
        config.baseURL = "http://localhost:5100";
      } else {
        config.baseURL = baseURL;
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
