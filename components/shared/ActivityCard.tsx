import { Star, GitFork, GitPullRequest } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WatchEvent, ForkEvent, PullRequestReviewEvent, CreateEvent } from "@/utils/types/feed"

interface ActivityCardProps {
    event: WatchEvent | ForkEvent | PullRequestReviewEvent | CreateEvent    
}

const config = {
    WatchEvent: {
        icon: <Star className="w-3.5 h-3.5" />,
        color: "bg-yellow-500/10 text-yellow-500",
        label: (event: WatchEvent) => (
            <>starred <code className="text-xs bg-muted px-1 py-0.5 rounded">{event.repo.name}</code></>
        ),
    },
    ForkEvent: {
        icon: <GitFork className="w-3.5 h-3.5" />,
        color: "bg-blue-500/10 text-blue-400",
        label: (event: ForkEvent) => (
            <>forked <code className="text-xs bg-muted px-1 py-0.5 rounded">{event.repo.name}</code></>
        ),
    },
  PullRequestReviewEvent: {
    icon: <GitPullRequest className="w-3.5 h-3.5" />,
    color: "bg-green-500/10 text-green-500",
    label: (event: PullRequestReviewEvent) => (
        <>reviewed a pull request in <code className="text-xs bg-muted px-1 py-0.5 rounded">{event.repo.name}</code></>
    ),
  },
    CreateEvent: {
        icon: <GitPullRequest className="w-3.5 h-3.5" />,
        color: "bg-purple-500/10 text-purple-500",
        label: (event: CreateEvent) => (
            <>created a new {event.payload.ref_type} in <code className="text-xs bg-muted px-1 py-0.5 rounded">{event.repo.name}</code></>
        ),
    }
}

export default function ActivityCard({ event }: ActivityCardProps) {
    let content;
    if(!config[event.type]) {
        // default case for unsupported event types, should not happen since we filter them out at the source
        const { icon, color, label } = {
            icon: <GitPullRequest className="w-3.5 h-3.5" />,
            color: "bg-muted text-muted-foreground",
            label: (event: any) => <>unsupported event type</>
        };
        content = {icon, color, label: label(event)}
    }
    else {
        const { icon, color, label } = config[event.type as keyof typeof config];
        content = {icon, color, label: label(event as any)}
    }

    const { icon, color, label } = content;
    return (
        <Card className="w-full max-w-full overflow-hidden bg-card border-border">
            <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
                    {icon}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                    <Avatar className="w-5 h-5">
                        <AvatarImage src={event.actor.avatar_url} />
                        <AvatarFallback className="text-[10px]">
                            {event.actor.login[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{event.actor.login}</span>
                    <span className="truncate">{label}</span>
                </div>

                <span className="ml-auto text-xs text-muted-foreground">
                    {event.created_at}
                </span>
            </CardContent>
        </Card>
    )
}
