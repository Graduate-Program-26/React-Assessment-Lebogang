"use client";
import { cn } from "@/lib/utils";
import FeedItem from "./FeedItem";
import { FeedEvent } from "@/utils/types/feed";
import { getTrendingFeed } from "@/lib/actions/feed.actions";
import { useQuery } from "@tanstack/react-query";
import RepoCard from "@/components/shared/RepoCard";
import { GitHubRepo } from "@/utils/types/types";
import { useMemo } from "react";

export default function Feed() {
    const { data: feedItems } = useQuery({
        queryKey: ['trendingFeed'],
        queryFn: getTrendingFeed
    });

    const combinedFeed = useMemo(() => {
        if (!feedItems) return [];

        const repos = feedItems.repos.map(repo => ({ 
            ...repo, 
            feedType: 'repo' as const 
        }));
    
        const events = feedItems.events?.map(event => ({ 
            ...event, 
            feedType: 'event' as const 
        }));

        const combined = [...repos, ...(events || [])];
        // Sort by created_at date, newest first
        combined.sort((a, b) => {
            const dateA = new Date('created_at' in a ? a.created_at : a.created_at).getTime(); // just works ..... 
            const dateB = new Date('created_at' in b ? b.created_at : b.created_at).getTime();
            return dateB - dateA;
        });
        return combined;
    }, [feedItems]);

    return (
        <div className={cn("w-full", "space-y-4")}>
            <h2 className="text-3xl font-bold">Trending Repositories & Recent Activity</h2>
            {combinedFeed.map((item) => {
                if (item.feedType === 'repo') {
                    const repo = item as GitHubRepo;
                    return <RepoCard key={repo.id} repo={repo} />
                } else {
                    const event = item as FeedEvent;
                    return <FeedItem key={event.id} data={event} />
                }
            })}
        </div>
    )
}