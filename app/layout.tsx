import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans">
        <SessionProvider session={session} refetchInterval={0}             // no polling
          refetchOnWindowFocus={false} >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
