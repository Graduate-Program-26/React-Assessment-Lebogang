import { cn } from "@/lib/utils";
import FeedItem from "./FeedItem";
import { FeedEvent } from "@/utils/types/feed";

export default function Feed() {
    const feedItems: FeedEvent[] = []; // just get the last 10 items for feed
    return (
        <div className={cn("w-full", "space-y-4")}>
            {feedItems.map((item) => (
                <FeedItem key={item.id} data={item} />
            ))}
        </div>
    )
}