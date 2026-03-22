import ActivityCard from "@/components/shared/ActivityCard"
import RepoCardEvent from "@/components/shared/RepoCardEvent"
import { FeedEvent } from "@/utils/types/feed"


import { mockFeedEvents } from "@/lib/mock/data"

export default function ActivityFeed() {
    const events: FeedEvent[] = mockFeedEvents.slice(0, 10); 

    if (events.length === 0) {
        return (
            <p className="text-sm text-muted-foreground text-center py-12">
                No recent activity
            </p>
        )
    }

    return (
        <div className="flex flex-col divide-y divide-border">
            {events.map((event) => (
                <div key={event.id} className="px-4 py-3">
                    {event.type === "PushEvent" || event.type === "PullRequestEvent"
                        ? <RepoCardEvent event={event} />
                        : <ActivityCard event={event} />
                    }
                </div>
            ))}
        </div>
    )
}