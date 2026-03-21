import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },
    async session({ session, token }) {
      session.sessionToken = token.accessToken || '';
      return session;
    },
  }
});