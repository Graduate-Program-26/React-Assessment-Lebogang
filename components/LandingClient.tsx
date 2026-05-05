// landing page seperated because of The page stays a server component and handles the session redirect. 
// Everything interactive moves to a client component:
// everything interactive lives here for the landing page
"use client"

import { signIn } from "next-auth/react"
import { GitGraph } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlobeDemo } from "@/components/shared/GitGlobe"
import { Suspense } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react";
export default function LandingClient() {

    const { setTheme, resolvedTheme } = useTheme();

    const handleThemeToggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center">

                <div className="flex flex-col items-center gap-3">
                    <h1 className="font-mono text-5xl font-bold tracking-tight">
                        Git<span className="text-blue-500">.</span>stagram
                    </h1>
                        <button
                    onClick={handleThemeToggle}
                    className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors text-[10px] text-muted-foreground hover:text-foreground cursor-pointer"
                >
                    <div className="relative w-5 h-5 flex items-center justify-center">
                        <Sun className="w-5 h-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute w-5 h-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </div>
                    <span>Theme</span>
                </button>

                    <section>
                        <p className="max-w-md text-muted-foreground">
                            GitHub as a social feed. Follow developers, watch repos, and track activity — the way it should feel.
                        </p>
                    </section>
                </div>

                <Button
                    size="lg"
                    className="gap-2 px-8"
                    onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                >
                    <GitGraph className="w-5 h-5" />
                    Connect with GitHub
                </Button>

            
                <div className="w-full h-64 mt-6 ">
                    <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-muted-foreground text-xs rounded-lg animate-pulse">
                    Loading globe...
                </div>
            }>
                        <GlobeDemo />
                    </Suspense>
                </div>
            </main>

            <footer className="py-6 text-center text-xs text-muted-foreground">
                Not affiliated with GitHub. But uses the GitHub API.
            </footer>
        </div>
    )
}
