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
import { useState } from "react";
import Image from "next/image";

const GITHUB_LOADING_STATES = [
    {
        icon: '/gifs/copilot.gif',
        message: 'Summoning the Octocat...',
    },
    {
        icon: '/gifs/copilot.gif',
        message: 'Asking Copilot to write some magic...',
    },
    {
        icon:  '/gifs/duck.gif',
        message: 'Consulting the rubber ducky...',
    },
];

const storyGraphics = [
    '/gifs/copilot.gif',
    '/gifs/copilot.gif',
    '/gifs/duck.gif',
    '/svgs/boxertocat.jpg',
   '/svgs/codercat.jpg',
   '/svgs/Fintechtocat.png',
   '/svgs/forktocat.jpg',
   '/svgs/inspectocat.jpg',
   '/svgs/luchadorcat.png',
   '/svgs/manufacturetocat.png',
   '/svgs/securitocat.png',
   '/svgs/securityknightocat.png',
   '/svgs/setuptocat.jpg',
   '/svgs/contribution.svg',
   '/svgs/version-control.svg',
];

// Uses a Render Props pattern. Instead of just passing a static image or string, you are passing a function that returns JSX.
export function StoriesPopup({ userData }: { userData: StoryItemProp }) {
    const [loadingState] = useState(() => {
        const randomIndex = Math.floor(Math.random() * GITHUB_LOADING_STATES.length);
        return GITHUB_LOADING_STATES[randomIndex];
    });

    const randomGraphic = storyGraphics[Math.floor(Math.random() * storyGraphics.length)];

    const { data: stories, isLoading } = useQuery({
        queryKey: ['user-commits', userData.username],
        queryFn: () => fetchLastSixCommits(userData.username),
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        select: (data) => {
            if (!data) return [];

          return data.map((story) => {
                // Defensive programming: safely find the message and fallback to prevent crashes
                const message = story?.commit?.message || story?.message || 'No commit message provided';
                
                // Pick a random illustration for each story slide
                const randomGraphic = storyGraphics[Math.floor(Math.random() * storyGraphics.length)];

                return {
                    content: ({ action, isPaused }: any) => (
                       <div className="h-full w-full bg-zinc-950 text-white p-8 flex flex-col justify-between border-x border-zinc-900 select-none">
                        
                        {/* Commit Message Container - Takes remaining space */}
                        <div className="flex-1 flex flex-col justify-start overflow-y-auto">
                            <span className="text-blue-400 font-mono text-xs tracking-tighter block mb-2">
                                📁 {story.repoName || 'Repository'}
                            </span>
                            
                            <h2 className="text-xl md:text-2xl font-bold leading-tight tracking-tight line-clamp-6 whitespace-pre-wrap">
                                {message}
                            </h2>
                        </div>

                        {/* Standardized Graphic Container - Fixed size to prevent content shift */}
                        <div className="flex-none flex items-center justify-center my-6">
                            <div className="w-20 h-20 relative opacity-80">
                                <Image
                                    src={randomGraphic}
                                    alt="Story illustration"
                                    fill
                                    loading="eager"
                                    sizes="80px"
                                    priority
                                    className="object-contain invert dark:invert-0"
                                />
                            </div>
                        </div>

                            {/* Footer Information */}
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                    {story.created_at ? new Date(story.created_at).toDateString() : 'N/A'}
                                </p>
                                <span className="text-[10px] font-mono text-zinc-600">
                                    {story.username || 'Developer'}
                                </span>
                            </div>
                        </div>
                    ),
                    duration: 5000,
                };
            });
        }
    });

    return (
        <DialogContent>
            {!stories || isLoading ? (
                <DialogTitle className="font-mono text-base">

                    <div className="flex flex-col items-center justify-center aspect-9/16 p-6 gap-6 text-center">
                        {/* Thematic Loading State */}
                        <div className="flex flex-col items-center gap-6 animate-pulse text-zinc-500">
                            <div className="w-20 h-20 relative">
                                <Image
                                    src={loadingState.icon}
                                    alt="Loading..."
                                    fill
                                    className="object-contain opacity-80 invert dark:invert-0"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <Spinner className="w-5 h-5 text-blue-400" />
                                <p className="text-xs font-mono text-zinc-400 max-w-[220px] text-center">
                                    {loadingState.message}
                                </p>
                            </div>
                        </div>
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