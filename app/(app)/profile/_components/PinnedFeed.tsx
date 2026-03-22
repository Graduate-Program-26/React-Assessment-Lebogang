
import RepoCard from "@/components/shared/RepoCard"
import { mockAllRepos } from "@/lib/mock/data"

export default function PinnedFeed() {
    const feed = mockAllRepos.slice(0, 6).reverse();
    return (
        <div className="grid grid-cols-3 gap-[1.5px] bg-border">
            {feed.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
        </div>
    )
}