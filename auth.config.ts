import type { NextAuthConfig } from 'next-auth';
import GitHub from "next-auth/providers/github";




export const authConfig = {
    pages: {
        signIn: '/',
        signOut: '/logout'
    },
    secret: process.env.BETTER_AUTH_SECRET,
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnExplore = nextUrl.pathname.startsWith('/explore');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isOnExplore) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === '/') {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }
    },
} satisfies NextAuthConfig;