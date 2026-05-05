

import { FeedEvent } from "@/utils/types/feed";
import ActivityCard from "@/components/shared/ActivityCard";
import RepoCardEvent from "@/components/shared/RepoCardEvent";


export default function FeedItem({ data }: { data: FeedEvent }) {
    switch (data.type) {
        case "PushEvent":
            return <RepoCardEvent event={data} />
        case "PullRequestEvent":
            return <RepoCardEvent event={data} />
        case "WatchEvent":
        case "ForkEvent":
            return <ActivityCard event={data} />
        default:
            return null
    }
}