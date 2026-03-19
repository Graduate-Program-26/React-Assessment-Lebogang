import { cn } from "@/lib/utils";
import FeedItem from "./FeedItem";
import { FeedEvent } from "@/utils/types/feed";

export default function Feed() {
    const feedItems: FeedEvent[] = [];
    return (
        <div className={cn("w-full", "space-y-4")}>
            {feedItems.map((item, index) => (
                <FeedItem key={index} data={item} />
            ))}
        </div>
    )
}