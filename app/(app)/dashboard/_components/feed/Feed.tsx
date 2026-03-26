"use client";
import { cn } from "@/lib/utils";
import FeedItem from "./FeedItem";
import { FeedEvent } from "@/utils/types/feed";
import { getTrendingFeed } from "@/lib/actions/feed.actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import RepoCard from "@/components/shared/RepoCard";
import { GitHubRepo } from "@/utils/types/types";
import { useMemo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ActivityFeedSkeleton } from "@/app/(app)/profile/_components/ProfileSkeletons";
import { Spinner } from "@/components/ui/spinner"


export default function Feed() {
    const { ref, inView } = useInView();

    const {
        data: feedItems,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["feed"],
        staleTime: 1000 * 60 * 15, // 15 minutes
        queryFn: ({ pageParam }) => getTrendingFeed(20, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const reposCount = lastPage?.repos?.length ?? 0;
            const eventsCount = lastPage?.events?.length ?? 0;
            return lastPage && (reposCount + eventsCount) > 0 ? allPages.length + 1 : undefined;
        },

    });

    const combinedFeed = useMemo(() => {
        if (!feedItems) return [];
        // flatmap helps to combine the paginated results into a single array of items (built in from infinite query pages)
        const allRepos = feedItems.pages.flatMap(page =>
            (page.repos || []).map(repo => ({
                ...repo,
                feedType: 'repo' as const,
            }))
        );

        const allEvents = feedItems.pages.flatMap(page =>
            (page.events || []).map(event => ({
                ...event,
                feedType: 'event' as const,
            }))
        );


        const combined = [...allRepos, ...(allEvents || [])];
        // Sort by created_at date, newest first
        combined.sort((a, b) => {
            const getTime = (obj: any) => {
                // If it has created_at, use it. 
                // If not (it's a Repo), use a fallback like 'pushed_at' or 'now'
                const dateStr = 'created_at' in obj ? obj.created_at : (obj.pushed_at || new Date().toISOString());
                return new Date(dateStr).getTime();
            };

            return getTime(b) - getTime(a);
        });
        return combined;
    }, [feedItems]);

    // Fetch next page when inView becomes true
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (status === "pending") {
        return (
            <div className="w-full space-y-4">
                <h2 className="text-3xl font-bold">Trending Repositories & Recent Activity</h2>
                <ActivityFeedSkeleton length={12} />
            </div>
        )
    }

    return (
        <div className={cn("w-full", "space-y-4")}>
            <h2 className="text-3xl font-bold">Trending Repositories & Recent Activity</h2>
            {combinedFeed.map((item) => {
                if (item.feedType === 'repo') {
                    const repo = item as GitHubRepo;
                    return <RepoCard key={repo.id + crypto.randomUUID()} repo={repo} />
                } else {
                    const event = item as FeedEvent;
                    return <FeedItem key={event.id + crypto.randomUUID()} data={event} />
                }
            })}

            <div ref={ref} className="py-10 flex justify-center">
                {isFetchingNextPage ? (
                    <Spinner className="size-8" />
                ) : hasNextPage ? (
                    <span className="text-xs opacity-20 uppercase tracking-widest">Scroll for more</span>
                ) : (
                    <div className="badge badge-outline opacity-30">End of the Feed</div>
                )}
            </div>
        </div>
    )
}