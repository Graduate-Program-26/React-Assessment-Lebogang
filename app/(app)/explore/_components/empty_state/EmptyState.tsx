
import { Search } from "lucide-react"
import { GlobeDemo } from "@/components/shared/GitGlobe"
import { GlobeErrorBoundary } from "@/components/shared/GlobeErrorBounds";
import { Suspense } from "react"
import Image from "next/image"
interface EmptyStateProps {
    hasQuery: boolean    // true = searched but no results, false = no search yet
}

export default function EmptyState({ hasQuery }: EmptyStateProps) {
    return (
        <div className="flex flex-col justify-between h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] px-4 w-full max-w-md mx-auto text-center">
            <div className="flex flex-col items-center gap-6">

                <div className="w-30 h-30 rounded-full dark:bg-secondary bg-primary-foreground flex items-center justify-center">
                    <Image
                        src="/svgs/search.svg"
                        alt="Search"
                        width={280}
                        height={280}
                        className="text-muted-foreground"
                    />
                </div>

                {hasQuery ? (
                    <div>
                        <h2 className="text-base font-semibold">No results found</h2>
                        <p className="text-sm text-muted-foreground max-w-xs mt-1">
                            Try a different keyword or switch between repos and devs.
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-base font-semibold">Search Dev-Gram</h2>
                        <p className="text-sm text-muted-foreground max-w-xs mt-1">
                            Find repos by name or discover developers to.
                        </p>
                    </div>
                )}

                {!hasQuery && (
                    <div className="w-[90vw] h-[50vh] relative">
                        <GlobeErrorBoundary>
                            <Suspense fallback={
                                <div className="text-xs text-muted-foreground flex items-center justify-center h-full bg-secondary/50 rounded-lg animate-pulse">
                                    Loading globe...
                                </div>
                            }>
                                <GlobeDemo />
                            </Suspense>
                        </GlobeErrorBoundary>                    </div>
                )}
            </div>



        </div>
    );
}