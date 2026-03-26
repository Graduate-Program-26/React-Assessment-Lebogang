import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Fjalla_One } from 'next/font/google'
import './globals.css'
const fjalla = Fjalla_One({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap' 
})
export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-background text-foreground ${fjalla.className}`}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
