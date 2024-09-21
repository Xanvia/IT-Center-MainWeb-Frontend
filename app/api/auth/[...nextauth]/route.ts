import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch("http://localhost:3001/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.refresh_token}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    ...response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3001/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            hashedPassword: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        const user = await res.json();
        if (!res.ok) {
          console.log(user.message);
          if (user.field == "password") throw Error("password");
          else throw Error("email");
          // return null;
        }

        return user;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
