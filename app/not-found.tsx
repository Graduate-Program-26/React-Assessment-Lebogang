import Link from 'next/link'
import { Terminal, Home, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25" />
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-lg p-6 font-mono shadow-2xl">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-orange-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
       
          <p className="text-red-500 mb-2 font-bold text-lg leading-none">
           404: RESOURCE_NOT_FOUND
          </p>
        
        </div>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        This branch doesn't exist.
      </h1>
      <p className="text-zinc-400 max-w-md mx-auto mb-8">
        The page you are looking for has been deleted, moved, or is currently private. 
        My bad,
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button asChild variant="default" className="gap-2">
          <Link href="/">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}