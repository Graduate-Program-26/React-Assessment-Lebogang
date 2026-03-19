import { Star, GitFork } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WatchEvent, ForkEvent } from "@/utils/types/feed"

interface ActivityCardProps {
    event: WatchEvent | ForkEvent
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
}

export default function ActivityCard({ event }: ActivityCardProps) {
    const { icon, color, label } = config[event.type];

    return (
        <Card className="bg-card border-border">
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
                    <span className="truncate">{label(event as any)}</span>
                </div>

                <span className="ml-auto text-xs text-muted-foreground">
                    {event.created_at}
                </span>
            </CardContent>
        </Card>
    )
}
