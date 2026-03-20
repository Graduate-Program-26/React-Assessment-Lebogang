import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/naviagtion/NavBar";
import SideBar from "@/components/naviagtion/SideBar";
import BottomBar from "@/components/naviagtion/BottomBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">

      <body className="bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <Navbar />


          <SidebarProvider className="flex min-h-screen pt-13">
            {/* desktop sidebar — invisible on mobile */}
            <aside className="hidden md:flex md:w-55 md:flex-col md:fixed md:top-13 md:bottom-0 md:border-r md:border-border">
              <SideBar />
            </aside>

            {/* main content — full width mobile, offset on desktop */}
            <main className="flex-1 w-full md:ml-55 pb-20 md:pb-0">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>

          <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background">
            <BottomBar />
          </nav>
        </ThemeProvider>
      </body>
    </html>
  );
}
