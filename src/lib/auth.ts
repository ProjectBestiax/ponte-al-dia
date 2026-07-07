import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { db } from "@/lib/db";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPrismaClient = any;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db as AnyPrismaClient),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "database",
  },
  events: {
    createUser() {
      // Flag checked by the signIn callback to redirect new users to /bienvenida
      (globalThis as Record<string, unknown>).__newUser = true;
    },
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      if ((globalThis as Record<string, unknown>).__newUser) {
        delete (globalThis as Record<string, unknown>).__newUser;
        return `${baseUrl}/bienvenida`;
      }
      return baseUrl;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // @ts-expect-error extended fields
        session.user.role = user.role;
        // @ts-expect-error extended fields
        session.user.username = user.username;
        // @ts-expect-error extended fields
        session.user.karma = user.karma;
        // @ts-expect-error extended fields
        session.user.isPremium = user.isPremium;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
