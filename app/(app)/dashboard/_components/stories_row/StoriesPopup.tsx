"use client";
import {

   
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
   
} from "@/components/ui/dialog"
import { StoryItemProp } from "./StoryItem"
const Stories = dynamic(() => import('react-insta-stories'), { ssr: false });
import { fetchLastSixCommits } from "@/lib/actions/explore.actions";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

// Uses a Render Props pattern. Instead of just passing a static image or string, you are passing a function that returns JSX.
export function StoriesPopup({ userData }: { userData: StoryItemProp }) {
    const { data: stories, isLoading } = useQuery({
        queryKey: ['user-commits', userData.username],
        queryFn: () => fetchLastSixCommits(userData.username),
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        select: (data) => {
            if(!data) return [];

            return data.map((story) => ({
                content: ({ action, isPaused }: any) => (
                    <div className="h-full w-full bg-zinc-950 text-white p-10 flex flex-col justify-center border-x border-zinc-900">
                        <span className="text-blue-400 font-mono text-xs mb-3 tracking-tighter">
                            {story.repoName}
                        </span>
                        <h2 className="text-2xl font-bold leading-tight tracking-tight">
                            {story.commit?.message}
                        </h2>
                        <div className="mt-10 pt-4 border-t border-white/5">
                            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                {new Date(story.created_at).toDateString()}
                            </p>
                        </div>
                    </div>
                ),
                duration: 5000,
            }));
        }
    });

    return (
        <DialogContent>
            {!stories ||  isLoading ? (
                <DialogTitle className="font-mono text-base">

                <div className="aspect-9/16 flex items-center justify-center">
                   <Skeleton />
                </div>
                </DialogTitle>
            ) : (
                <>
            <DialogHeader>
                <DialogTitle className="font-mono text-base">
                    {userData.username}
                </DialogTitle>
            </DialogHeader>

            <DialogDescription className="mt-1 line-clamp-2">
                <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View GitHub Profile
                </a>
            </DialogDescription>

            <div className="relative flex items-center justify-center w-full aspect-9/16 bg-zinc-950">
                {stories!.length > 0 ? (
                    <Stories
                        stories={stories}
                        defaultInterval={5000}
                        width="100%"
                        height="100%"
                        storyContainerStyles={{ borderRadius: '8px', overflow: 'hidden' }}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-zinc-500">
                        <Spinner />
                        <p className="text-xs font-mono">Fetching commits...</p>
                    </div>
                )}
            </div>
            </>
            )}
        </DialogContent>
    )
}