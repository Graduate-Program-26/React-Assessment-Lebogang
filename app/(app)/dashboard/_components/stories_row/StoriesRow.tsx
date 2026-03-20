import {type StoryItemProp} from "./StoryItem";
import StoryItem from "./StoryItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"


import { mockStories } from "@/lib/mock/data";
export default function StoriesRow() {
    const stories: StoryItemProp[] = mockStories;
    // fetch list of stories
    return (
        <Carousel opts={{ dragFree: true, align: "start" }} className="w-full">
            <CarouselContent className="w-full">
                {stories.map((story) => (
                    <CarouselItem key={story.username} className="basis-auto pl-3">
                        <StoryItem data={story} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}