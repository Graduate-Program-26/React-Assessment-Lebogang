import RepoCard from "@/components/shared/RepoCard"
import { mockAllRepos } from "@/lib/mock/data"


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