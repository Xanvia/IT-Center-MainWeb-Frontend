// Environment variable test utility
export function debugEnvironmentVariables() {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // Don't log sensitive variables in client
    ...(typeof window === "undefined" && {
      INTERNAL_BACKEND_URL: process.env.INTERNAL_BACKEND_URL
        ? "configured"
        : "missing",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "configured" : "missing",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    }),
  };

  console.log("Environment variables check:", envVars);

  // Client-side specific checks
  if (typeof window !== "undefined") {
    console.log("Running on client-side");
    console.log("Window location:", window.location.href);
  } else {
    console.log("Running on server-side");
  }

  return envVars;
}

// Fallback URL generator for production
export function getBackendUrlWithFallback(): string {
  // First try the environment variable
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  // If in browser, try to construct from current location
  if (typeof window !== "undefined") {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    // If we're on the expected frontend port, assume backend is on 5100
    if (window.location.port === "5000" || !window.location.port) {
      const fallbackUrl = `${protocol}//${hostname}:5100`;
      console.warn(
        `NEXT_PUBLIC_BACKEND_URL not found, using fallback: ${fallbackUrl}`
      );
      return fallbackUrl;
    }
  }

  // Last resort fallback
  const fallbackUrl = "http://localhost:5100";
  console.warn(`Using last resort fallback: ${fallbackUrl}`);
  return fallbackUrl;
}
