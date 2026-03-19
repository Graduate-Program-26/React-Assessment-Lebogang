import clsx from "clsx";
interface StoryItem {
    avatar_url: string;
    username: string;
    html_url: string;
    url: string;
    has_story: boolean;
    is_self?: boolean;
    is_active?: boolean;  // has pushed code in last 24h
}


export default function StoryItem({ data }: { data: StoryItem }) {
    const ringClass = {
        self: "bg-gradient-to-tr from-blue-400 to-green-400",
        active: "bg-gradient-to-tr from-blue-500 via-purple-500 to-yellow-400",
        story: "bg-gradient-to-tr from-blue-500 to-green-400",
        inactive: "bg-muted/30",
    } as const;

    const variant = data.is_self ? ringClass.self :
        data.is_active ? ringClass.active :
            data.has_story ? ringClass.story :
                ringClass.inactive;

    // variant used to map the gradient colors to the story item based on the user status, done in this manner for cleaner code using clsx conditionals 
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className={clsx("p-[2.5px] rounded-full", variant)} >
                <div className="bg-background p-2 rounded-full">
                    <img
                        src={data.avatar_url}
                        alt={data.username}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                </div>
            </div>
            <p className="text-xs text-muted-foreground truncate max-w-16 text-center">
                {data.username}
            </p>
        </div>
    )
}