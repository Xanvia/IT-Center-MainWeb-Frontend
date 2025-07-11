import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import Axios from "./axios";

async function refreshToken(token: JWT) {
  try {
    const res = await fetch(
      `${process.env.INTERNAL_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token.refresh_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Refresh token failed:", errorData);
      throw new Error(errorData?.message || "Token refresh failed");
    }

    const data = await res.json();
    console.log("refreshed");
    return {
      ...token,
      ...data,
    };
  } catch (error: any) {
    console.error("Refresh token error!!!", error);
    return token; // optionally return original token to avoid breaking the session
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
          }
        );

        const user = await res.json();
        if (!res.ok) {
          console.log("Error in auth", user);
          if (user.field == "password") throw Error("password");
          else throw Error(user.message);
          // return null;
        }

        return user;
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
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;

      return session;
    },
  },
};
