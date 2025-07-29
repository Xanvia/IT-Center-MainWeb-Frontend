// Environment variable validation utility

export function validateEnvironmentVariables() {
  // Don't validate during build time as environment variables might not be available
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    console.log("Skipping environment validation during build phase");
    return { isValid: true, missing: [], error: null };
  }

  const required = {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // Only require INTERNAL_BACKEND_URL in server-side contexts
    ...(typeof window === "undefined" && {
      INTERNAL_BACKEND_URL: process.env.INTERNAL_BACKEND_URL,
    }),
  };

  const missing = Object.entries(required)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    const error = `Missing required environment variables: ${missing.join(
      ", "
    )}`;
    console.error(error);

    // Only throw errors in development or runtime, not during build
    if (process.env.NODE_ENV === "development") {
      if (typeof window === "undefined") {
        // Server-side: throw error to be caught by error boundary
        throw new Error(error);
      } else {
        // Client-side: show user-friendly message
        console.warn("Environment configuration issue detected");
      }
    } else {
      // Production: just log the warning
      console.warn("Environment configuration issue detected");
    }

    return { isValid: false, missing, error };
  }

  return { isValid: true, missing: [], error: null };
}

export function getBackendUrl(): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!url) {
    // During build time, return a placeholder
    if (
      typeof window === "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      console.warn(
        "NEXT_PUBLIC_BACKEND_URL not available during build, using placeholder"
      );
      return "http://localhost:5100";
    }
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
  }
  return url;
}

export function getInternalBackendUrl(): string {
  const url = process.env.INTERNAL_BACKEND_URL;
  if (!url) {
    // During build time, return a placeholder
    if (
      typeof window === "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      console.warn(
        "INTERNAL_BACKEND_URL not available during build, using placeholder"
      );
      return "http://localhost:5100";
    }
    throw new Error("INTERNAL_BACKEND_URL is not configured");
  }
  return url;
}

// Safe fetch wrapper with error handling
export async function safeFetch(url: string, options: RequestInit = {}) {
  try {
    // Add default timeout if not specified
    const timeoutMs = 10000; // 10 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      ...options,
      signal: options.signal || controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}
