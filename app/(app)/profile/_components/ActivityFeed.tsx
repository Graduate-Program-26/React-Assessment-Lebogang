"use client"
import ActivityCard from "@/components/shared/ActivityCard"
import RepoCardEvent from "@/components/shared/RepoCardEvent"
import { FeedEvent } from "@/utils/types/feed"

import { fetchUserEvents } from "@/lib/actions/users.actions"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { ActivityFeedSkeleton } from "./ProfileSkeletons"
import { Button } from "@/components/ui/button"

export default function ActivityFeed() {
    const { username } = useParams();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["events", username],
        staleTime: 1000 * 60 * 15, // 15 minutes
        queryFn: ({ pageParam }) => fetchUserEvents({ username: username as string, pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // If the last page was empty, there are no more pages
            return lastPage && lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
        
    });


    const events: FeedEvent[] = data
        ? data.pages.flat().filter((event): event is FeedEvent => event !== undefined)
        : [];

    if (status === "pending") return <ActivityFeedSkeleton />;

    if (events.length === 0) {
        return (
            <p className="text-sm text-muted-foreground text-center py-12">
                No recent activity
            </p>
        )
    }


    return (
        <div className="flex flex-col divide-y divide-border">
            {events?.map((event) => (
                <div key={event.id} className="px-4 py-3">
                    {event.type === "PushEvent" || event.type === "PullRequestEvent"
                        ? <RepoCardEvent event={event} />
                        : <ActivityCard event={event} />
                    }
                </div>
            ))}

            <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                variant="outline"
                className="mx-auto my-6"
            >
                {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to see"}
            </Button>
        </div>
    )
}