// Environment variable validation utility

export function validateEnvironmentVariables() {
  const required = {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    INTERNAL_BACKEND_URL: process.env.INTERNAL_BACKEND_URL,
  };

  const missing = Object.entries(required)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    const error = `Missing required environment variables: ${missing.join(
      ", "
    )}`;
    console.error(error);

    if (typeof window === "undefined") {
      // Server-side: throw error to be caught by error boundary
      throw new Error(error);
    } else {
      // Client-side: show user-friendly message
      console.warn("Environment configuration issue detected");
    }

    return { isValid: false, missing, error };
  }

  return { isValid: true, missing: [], error: null };
}

export function getBackendUrl(): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
  }
  return url;
}

export function getInternalBackendUrl(): string {
  const url = process.env.INTERNAL_BACKEND_URL;
  if (!url) {
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
