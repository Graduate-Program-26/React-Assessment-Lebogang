import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token as string
        token.name = profile?.name as string
        token.username = profile?.login as string
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string   
      session.user.username = token.username as string   // github login
      session.user.name = token.name as string
      return session
    },
  }
});