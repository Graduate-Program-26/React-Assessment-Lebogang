"use client"
import RepoCard from "@/components/shared/RepoCard"
import { fetchUserRepos } from "@/lib/actions/repo.actions";
import { GitHubRepo } from "@/utils/types/types"
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PinnedFeedSkeleton } from "./ProfileSkeletons";
import Image from "next/image";
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

    if (repos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="relative w-12 h-12 mb-4">
                    <Image
                        src="/svgs/void.svg"
                        alt="No activity"
                        loading="eager"
                        fill
                        className="text-muted-foreground"
                    />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    No pinned repos found
                </p>
            </div>
        )
    }

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