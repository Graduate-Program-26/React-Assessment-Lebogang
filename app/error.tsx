'use client' 

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const isRateLimit = error.message.includes('403') || error.message.includes('rate limit');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 border-2 border-dashed border-zinc-800 rounded-xl m-4">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">
        {isRateLimit ? "Rate Limit Exceeded" : "Something went wrong!"}
      </h2>
      <p className="text-zinc-400 text-center max-w-sm mb-6">
        {isRateLimit 
          ? "GitHub is tired of us asking for data. Please wait a minute before refreshing."
          : "We encountered an unexpected error while fetching the feed."}
      </p>
      <Button 
        onClick={() => reset()}
        variant="outline"
        className="gap-2"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  )
}