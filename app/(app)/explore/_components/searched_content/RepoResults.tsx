
import RepoCard from "@/components/shared/RepoCard"
import { mockContributedRepos } from "@/lib/mock/data"
export default function RepoResults({query}: {query: string}) { // would be repo name and search
    return (
        <div className="p-4">
            
            <div className="grid grid-cols-3 gap-4">
                {mockContributedRepos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    )
}