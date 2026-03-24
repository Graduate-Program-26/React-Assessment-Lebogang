"use client";
import {type StoryItemProp} from "./StoryItem";
import StoryItem from "./StoryItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { useEffect, useState } from "react";
import {discoverUsers} from "@/lib/actions/users.actions";

import { Skeleton } from "@/components/ui/skeleton";
export default function StoriesRow() {
    const [loading, setLoading] = useState(true);
    const [storiesData, setStoriesData] = useState<StoryItemProp[]>([]);
    
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await discoverUsers();
            console.log(data);
            if (data) {
                setStoriesData(data);
            }
            setLoading(false);
        };
        loadData();
    }, [])

    if (!storiesData || loading || storiesData.length === 0) {
        return (
            <div className="w-full flex space-x-4 px-3">
                {Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton key={index} className="w-16 h-16 rounded-full" />
                ))}
            </div>
        )
    }

    return (
        <Carousel opts={{ dragFree: true, align: "start" }} className="w-full">
            <CarouselContent className="w-full">
                {storiesData.map((story) => (
                    <CarouselItem key={story.username} className="basis-auto pl-3">
                        <StoryItem data={story} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}