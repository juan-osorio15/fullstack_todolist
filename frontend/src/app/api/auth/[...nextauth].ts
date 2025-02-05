/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/utils/axiosClient";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your actual login logic
        // (e.g., fetch from your backend API)
        const response = await apiClient.post("/auth/login", credentials);

        if (!response.data) {
          throw new Error("Invalid Email or Password");
        }

        const { user, token } = await response.data;

        user.token = token;

        if (user && token) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        token.jwt = user.token; // Include the JWT in the token object
      }
      return token;
    },
    session: ({ session, token }: any) => {
      session.user = token.jwt; // Attach the JWT to the session object
      return session;
    },
  },
});
