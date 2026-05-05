
import RepoCard from "@/components/shared/RepoCard"
import { searchRepos } from "@/lib/actions/explore.actions"
import { ProfileFeedSkeleton } from "@/app/(app)/profile/_components/ProfileSkeletons";

import { useEffect, useState } from "react"
import { GitHubRepo } from "@/utils/types/types";
import Image from "next/image";

export default function RepoResults({ query }: { query: string }) { // would be repo name and search
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);

    useEffect(() => {
        if (query.trim().length > 1) {
            const loadData = async () => {
                setLoading(true);
                const data = await searchRepos(query, { per_page: 12 });
                if (data) setRepos(data);
                setLoading(false);
            };
            loadData();
        } else {
            setRepos([]);
            setLoading(false);
        }
    }, [query]);

    if (loading) return <ProfileFeedSkeleton />;

    if (!repos || repos.length === 0) {
        return (
            <div className="text-center text-gray-500">
                No repositories found for "{query}"
            </div>
        )
    }

    return (
        <div className="p-4">

            <div className="grid grid-cols-3 gap-4">
                {repos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    )
}