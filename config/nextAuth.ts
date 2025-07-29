import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import Axios from "./axios";

async function refreshToken(token: JWT) {
  try {
    // Check if refresh token exists
    if (!token.refresh_token) {
      console.error("No refresh token available");
      return { ...token, error: "RefreshTokenMissing" };
    }

    // Check if INTERNAL_BACKEND_URL is configured
    if (!process.env.INTERNAL_BACKEND_URL) {
      console.error("INTERNAL_BACKEND_URL is not configured");
      return { ...token, error: "BackendURLMissing" };
    }

    const res = await fetch(
      `${process.env.INTERNAL_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token.refresh_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        // Add timeout and retry logic
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Refresh token failed:", errorData);

      // If refresh token is invalid, mark for re-authentication
      if (res.status === 401) {
        return { ...token, error: "RefreshTokenExpired" };
      }

      throw new Error(errorData?.message || "Token refresh failed");
    }

    const data = await res.json();
    console.log("Token refreshed successfully");

    return {
      ...token,
      ...data,
      error: undefined, // Clear any previous errors
    };
  } catch (error: any) {
    console.error("Refresh token error:", error);

    // Return error state to trigger re-authentication
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "local-credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Check if INTERNAL_BACKEND_URL is configured
          if (!process.env.INTERNAL_BACKEND_URL) {
            console.error(
              "INTERNAL_BACKEND_URL is not configured for authentication"
            );
            throw new Error("Server configuration error");
          }

          const res = await fetch(
            `${process.env.INTERNAL_BACKEND_URL}/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                hashedPassword: credentials?.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
              // Add timeout
              signal: AbortSignal.timeout(15000), // 15 second timeout
            }
          );

          const user = await res.json();
          if (!res.ok) {
            console.log("Error in auth", user);
            if (user.field == "password") throw Error("password");
            else throw Error(user.message);
          }

          return user;
        } catch (error: any) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
    CredentialsProvider({
      id: "google-credentials",
      credentials: {
        token: { label: "token", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const res = await Axios.post(
            "/auth/refresh",
            {},
            {
              headers: {
                authorization: `Bearer ${credentials?.token}`,
                "Content-type": "application/json",
              },
            }
          );
          return res.data;
        } catch (error) {
          if ((error as any).response) {
            const errorData = (error as any).response?.data;
            throw Error(errorData?.message);
          }
          throw Error();
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin", // Redirect to sign-in on error
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async signOut(message) {
      console.log("User signed out:", message);
    },
    async session(message) {
      if (message.token?.error) {
        console.log(
          "Session error detected, user will be redirected to sign in"
        );
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is signing in for the first time
      if (user) {
        return { ...token, ...user };
      }

      // Check if token has an error (from refresh failure)
      if (token.error) {
        console.log("Token has error, forcing re-authentication:", token.error);
        return { ...token, error: token.error };
      }

      // Check if token is still valid (add buffer time)
      const currentTime = new Date().getTime();
      const tokenExpiryTime = token.expiresIn as number;
      const bufferTime = 60 * 1000; // 1 minute buffer

      if (currentTime < tokenExpiryTime - bufferTime) {
        return token;
      }

      // Token is about to expire or has expired, try to refresh
      console.log("Token expired or about to expire, refreshing...");
      return await refreshToken(token);
    },

    async session({ token, session }) {
      // If token has an error, don't return a valid session
      if (token.error) {
        console.log(
          "Session callback: Token error detected, invalidating session"
        );
        throw new Error("Token refresh failed");
      }

      session.user = token.user;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;

      return session;
    },
  },
};
