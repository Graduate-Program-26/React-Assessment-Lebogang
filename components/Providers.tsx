// components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/lib/auth";

export async function Providers({ children }: { children: React.ReactNode }) {
 const session = await auth()
    
  return (
    <SessionProvider
        session={session}
    > 
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}