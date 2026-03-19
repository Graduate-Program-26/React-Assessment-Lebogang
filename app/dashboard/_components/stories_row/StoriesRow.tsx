import {type StoryItemProp} from "./StoryItem";
import StoryItem from "./StoryItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export default function StoriesRow() {
    const stories: StoryItemProp[] = []
    // fetch list of stories
    return (
        <Carousel opts={{ dragFree: true, align: "start" }} className="w-full">
            <CarouselContent className="w-full">
                {stories.map((story, index) => (
                    <CarouselItem key={index} className="basis-auto pl-3">
                        <StoryItem data={story} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}