"use client"
import RepoCard from "@/components/shared/RepoCard"

import { fetchRepos } from "@/lib/actions/repo.actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GitHubRepo } from "@/utils/types/types";
import { Suspense } from "react";
import { ProfileFeedSkeleton } from "./ProfileSkeletons";

export default function ProfileFeed() {
    const { username } = useParams();
    const [repos, setRepos] = useState<GitHubRepo[]>([]);


    useEffect(() => {
        if (username) {
            const loadRepos = async () => {
                const data = await fetchRepos(username as string);
                console.log("Fetched repos:", data);
                if (data) setRepos(data);
            };
            loadRepos();
        }
    }, [username]);

    if(!repos) {
        return <ProfileFeedSkeleton />
    }

    if (repos.length === 0) {
        return (
            <p className="text-sm text-muted-foreground text-center py-12">
                No repositories found
            </p>
        )
    }
    
    return (
        <Suspense fallback={<ProfileFeedSkeleton />}>
            <div className="grid grid-cols-3 gap-[1.5px] bg-border">
                {repos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </Suspense>
    )
}