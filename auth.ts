import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import {cookies} from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in", // Error
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );
          // if password is correct , return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      // if there is a new session , set the user id
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //   if there is an update , set the user name
      if (trigger === "update") {
        session.user.name = token.name;
      }

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role;

        // if the user has no name then use the email first part ;
        if (user.name == "NO_NAME") {
          token.name = user.email!.split("@")[0];

          // update the user name in the database
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ req, token }:any) {
      // check for session cart cookie
      if(!req.cookies.get("sessionCartId")) {
          // Generate a new session cart id and set it in the cookie
          const sessionCartId = crypto.randomUUID();

          // clone the req headers 
          const newRequestHeaders = new Headers(req.headers);

          // Create a new response and add the new headers
          const response = NextResponse.next({
            request: {
              headers: newRequestHeaders,
            },
          });

          // set newly generated session cart id in the cookie
          response.cookies.set("sessionCartId", sessionCartId);
          return response ;
          
      }else {
        return true;
      }
    }
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
