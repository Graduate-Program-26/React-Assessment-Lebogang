import RepoCard from "@/components/shared/RepoCard"
import { GitHubRepo } from "@/utils/types/types"

interface ProfileFeedProps {
    feed: GitHubRepo[],
}

export default function ProfileFeed({feed}: { feed: GitHubRepo[] }) {
    return (
        <div className="grid grid-cols-3 gap-[1.5px] bg-border">
            {feed.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
        </div>
    )
}