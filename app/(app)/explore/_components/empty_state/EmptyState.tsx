
import { Search } from "lucide-react"

interface EmptyStateProps {
    hasQuery: boolean    // true = searched but no results, false = no search yet
}

export default function EmptyState({ hasQuery }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <Search className="w-6 h-6 text-muted-foreground" />
            </div>

            {hasQuery ? (
                <>
                    <h2 className="text-base font-semibold">No results found</h2>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Try a different keyword or switch between repos and devs.
                    </p>
                </>
            ) : (
                <>
                    <h2 className="text-base font-semibold">Search Dev-Gram</h2>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Find repos by name or discover developers to.
                    </p>
                </>
            )}
        </div>
    )
}