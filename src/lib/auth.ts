import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
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
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await db.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  events: {
    createUser() {
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
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === "signIn" || trigger === "signUp" || !token.role) {
        const dbUser = await db.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, username: true, karma: true, isPremium: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.username = dbUser.username;
          token.karma = dbUser.karma;
          token.isPremium = dbUser.isPremium;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        // @ts-expect-error extended fields
        session.user.role = token.role;
        // @ts-expect-error extended fields
        session.user.username = token.username;
        // @ts-expect-error extended fields
        session.user.karma = token.karma;
        // @ts-expect-error extended fields
        session.user.isPremium = token.isPremium;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
