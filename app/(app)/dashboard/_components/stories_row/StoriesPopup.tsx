import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { StoryItemProp } from "./StoryItem"


export function StoriesPopup({userData}: {userData: StoryItemProp}) {
    const userName = userData.username;


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-mono text-base">
                    {userData.username}
                </DialogTitle>
                <DialogDescription className="mt-1 line-clamp-2">
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View GitHub Profile
                    </a>
                </DialogDescription>
            </DialogHeader>



        </DialogContent>
    )
}