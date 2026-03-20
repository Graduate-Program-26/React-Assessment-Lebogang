import { cn } from "@/lib/utils";
import FeedItem from "./FeedItem";
import { FeedEvent } from "@/utils/types/feed";


import { mockFeedEvents } from "@/lib/mock/data";
export default function Feed() {
    const feedItems: FeedEvent[] = mockFeedEvents.slice(0, 10); // just get the last 10 items for feed
    return (
        <div className={cn("w-full", "space-y-4")}>
            {feedItems.map((item) => (
                <FeedItem key={item.id} data={item} />
            ))}
        </div>
    )
}