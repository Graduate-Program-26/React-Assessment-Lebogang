import { redirect } from "next/navigation"
import { signIn } from "next-auth/react"
import { GitGraph } from "lucide-react"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/shared/SearchBar"
import { GlobeDemo } from "@/components/shared/GitGlobe"

export default async function Home() {
  const session = false; // for testing purposes, will replace with actual session from NextAuth in the future
  // if already authed, skip the landing page entirely
  if (session) redirect("/dashboard");

  const [query, setQuery] = ["", null]; // placeholder state for search query in the search bar (since we don't have a real search implementation yet)
  // issue with useState in this file since it's a server component, will need to refactor the search bar and empty state to work with server components if we want to have the search functionality on the landing page [which is a stretch goal :()]
  
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
        >
          <GitGraph className="w-5 h-5" />
          Connect with GitHub
        </Button>


        <div className="flex items-center gap-3 w-full max-w-sm">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or explore without an account</span>
          <div className="flex-1 h-px bg-border" />
        </div>


        <div className="w-full max-w-sm">
          <SearchBar value={query}
            onChange={setQuery}
            placeholder="Search repos, devs, languages..." />
        </div>

          <div className="w-full h-64 mt-6">
            <GlobeDemo />
          </div>
      </main>

      <footer className="py-6 text-center text-xs text-muted-foreground">
        Not affiliated with GitHub but with DVT? <br />
      </footer>
    </div>
  )
}