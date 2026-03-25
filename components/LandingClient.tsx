// landing page seperated because of The page stays a server component and handles the session redirect. 
// Everything interactive moves to a client component:
// everything interactive lives here for the landing page
"use client"

import { signIn } from "next-auth/react"
import { GitGraph } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlobeDemo } from "@/components/shared/GitGlobe"

export default function LandingClient() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center">

                <div className="flex flex-col items-center gap-3">
                    <h1 className="font-mono text-5xl font-bold tracking-tight">
                        Git<span className="text-blue-500">.</span>gram
                    </h1>
                    <p className="max-w-md text-muted-foreground">
                        GitHub as a social feed. Follow developers, watch repos, and track activity — the way it should feel.
                    </p>
                </div>

                <Button
                    size="lg"
                    className="gap-2 px-8"
                    onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                >
                    <GitGraph className="w-5 h-5" />
                    Connect with GitHub
                </Button>

                <div className="flex items-center gap-3 w-full max-w-sm">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground">or explore without an account</span>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <div className="w-full h-64 mt-6">
                    <GlobeDemo />
                </div>
            </main>

            <footer className="py-6 text-center text-xs text-muted-foreground">
                Not affiliated with GitHub but with DVT???
            </footer>
        </div>
    )
}
