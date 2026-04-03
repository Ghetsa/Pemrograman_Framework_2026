import {
  signIn,
  oauthSignIn,
} from "@/utils/db/servicefirebase";

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user: any = await signIn(credentials.email);

        if (user) {
          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (valid) {
            return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      // ✅ credentials
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }

      // 🔥 OAUTH (Google & GitHub jadi satu logic)
      if (account?.provider === "google" || account?.provider === "github") {
        await oauthSignIn(
          {
            fullname: user.name,
            email: user.email,
            image: user.image,
          },
          account.provider,
          (result: any) => {
            if (result.status) {
              token.fullname = result.data.fullname;
              token.email = result.data.email;
              token.image = result.data.image;
              token.type = result.data.type;
              token.role = result.data.role;
            }
          }
        );
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.fullname = token.fullname;
      session.user.image = token.image;
      session.user.role = token.role;
      session.user.type = token.type;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);