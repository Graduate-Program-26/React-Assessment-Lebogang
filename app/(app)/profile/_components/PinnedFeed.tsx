
import RepoCard from "@/components/shared/RepoCard"
import { GitHubRepo } from "@/utils/types/types"

export default function PinnedFeed({feed} : { feed: GitHubRepo[] }) {
    return (
        <div className="grid grid-cols-3 gap-[1.5px] bg-border">
            {feed.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
        </div>
    )
}