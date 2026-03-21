import RepoCard from "@/components/shared/RepoCard"
import { GitHubRepo } from "@/utils/types/types"
import { mockProfileData } from "@/lib/mock/data"
import { mockAllRepos } from "@/lib/mock/data"
interface ProfileFeedProps {
    feed: GitHubRepo[],
}

export default function ProfileFeed() {
    const feed = mockAllRepos;
    return (
        <div className="grid grid-cols-3 gap-[1.5px] bg-border">
            {feed.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
        </div>
    )
}