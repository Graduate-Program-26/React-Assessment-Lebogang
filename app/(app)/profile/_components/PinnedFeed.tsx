"use client"
import RepoCard from "@/components/shared/RepoCard"
import { fetchUserRepos } from "@/lib/actions/repo.actions";
import { GitHubRepo } from "@/utils/types/types"
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PinnedFeedSkeleton } from "./ProfileSkeletons";

export default function PinnedFeed() {
    const { username } = useParams();
    const [repos, setRepos] = useState<GitHubRepo[]>([]);


    useEffect(() => {
        if (username) {
            const loadRepos = async () => {
                const data = await fetchUserRepos(username as string, { sort: 'updated', per_page: 6 });
                if (data) setRepos(data);
            };
            loadRepos();
        }
    }, [username]);


    return (
        <Suspense fallback={<PinnedFeedSkeleton />}>
            <div className="grid grid-cols-3 gap-[1.5px] bg-border">
                {repos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>

        </Suspense>
    )
}