import { Skeleton } from "@/components/ui/skeleton"
export function RepoPopupSkeleton() {
    return (
        <div className="flex flex-col gap-4 pt-2">
            <div className="flex gap-5 border border-border rounded-lg px-4 py-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-36" />
            </div>
            <Skeleton className="h-9 w-full" />
        </div>
    )
}