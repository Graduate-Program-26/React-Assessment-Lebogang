"use client";
import {

   
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
   
} from "@/components/ui/dialog"
import { StoryItemProp } from "./StoryItem"
import Stories, { WithSeeMore } from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { fetchLastSixCommits } from "@/lib/actions/explore.actions";
import { useState, useEffect } from "react"
import { Spinner } from "@/components/ui/spinner";
// Uses a Render Props pattern. Instead of just passing a static image or string, you are passing a function that returns JSX.
export function StoriesPopup({ userData }: { userData: StoryItemProp }) {
    const [stories, setStories] = useState<Story[]>([])
    const userName = userData.username;
    useEffect(() => {
        const storyData = async () => {
            /*
            const data = await fetchLastSixCommits(userName);
            if (data) {
                const formatted = data.map((story) => ({
                    content: ({ action, isPaused }) => (
                        <div className="h-full w-full bg-zinc-900 text-white p-8 flex flex-col justify-center border-x border-zinc-800">
                            <span className="text-blue-400 font-mono text-xs mb-2">{story.repoName}</span>
                            <h2 className="text-xl font-bold leading-tight">{story.commit.message}</h2>
                            <div className="mt-8 pt-4 border-t border-white/10">
                                <p className="text-zinc-500 text-xs">{new Date(story.created_at).toDateString()}</p>
                            </div>
                        </div>
                    ),
                    duration: 5000
                }))

                setStories(formatted);
            }
                */
        }

        storyData();

    }, [userName])

    return (
        <DialogContent>
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
                {stories.length > 0 ? (
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

        </DialogContent>
    )
}