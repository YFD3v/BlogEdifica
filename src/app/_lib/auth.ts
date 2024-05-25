import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { authConfig } from "./authConfig";

interface LoginProps {
  email: string;
  password: string;
}
const login = async ({ email, password }: LoginProps) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw new Error("Wrong credentials!");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};
export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
