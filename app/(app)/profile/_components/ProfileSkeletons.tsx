import { Skeleton } from "@/components/ui/skeleton"

export function ProfileHeaderSkeleton() {
    return (
        <div className="flex items-start gap-6 p-4">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="flex flex-1 justify-around pt-2">
                <div className="flex flex-col items-center gap-0.5">
                    <Skeleton className="w-10 h-5 rounded" />
                    <span className="text-xs text-muted-foreground">repos</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                    <Skeleton className="w-10 h-5 rounded" />
                    <span className="text-xs text-muted-foreground">followers</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                    <Skeleton className="w-10 h-5 rounded" />
                    <span className="text-xs text-muted-foreground">following</span>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Skeleton className="w-full h-20 rounded" />
            </div>
        </div>
    )
}

export function ProfileFeedSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-40 rounded" />
            ))}
        </div>
    )
}

export function PinnedFeedSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-40 rounded" />
            ))}
        </div>
    )
}

export function ActivityFeedSkeleton({ length = 6 }: { length?: number }) {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length }).map((_, index) => (
                <Skeleton key={index} className="w-full h-16 rounded" />
            ))}
        </div>
    )
}