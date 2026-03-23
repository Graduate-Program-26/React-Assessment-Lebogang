import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { GitPullRequest, GitCommitHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { PushEvent, PullRequestEvent } from "@/utils/types/feed";


interface RepoCardProps {
    event: PushEvent | PullRequestEvent,
}

export default function RepoCardEvent({ event }: RepoCardProps) {
    const [owner, repo] = event.repo.name.split("/")

    return (
        <Card className="bg-card border-border hover:border-border/80 transition-colors">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-primary">
                        {owner}/
                        <span className="text-accent-foreground">{repo}</span>
                    </span>
                </div>
                <EventBadge event={event} />
            </CardHeader>

            <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {event.type === "PushEvent"
                        ? (event.commits.map((commit) => commit.commit.message).join("\n") || "No commit message")
                        : event.payload.pull_request.title}
                </p>
            </CardContent>

            <CardFooter className=" flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                        {/* Repo stats details  */}
            </CardFooter>
        </Card>
    )
}

function EventBadge({ event }: { event: PushEvent | PullRequestEvent }) {
    if (event.type === "PushEvent") {
        const count = event.commits.length
        return (
            <Badge variant="secondary" className="gap-1 font-mono text-xs">
                <GitCommitHorizontal className="w-3 h-3" />
                {count} {count === 1 ? "commit" : "commits"}
            </Badge>
        )
    }

    const { action, pull_request } = event.payload
    const merged = pull_request.merged

    return (
        <Badge
            variant="secondary"
            className="gap-1 font-mono text-xs"
        >
            <GitPullRequest className="w-3 h-3" />
            {merged ? "merged" : action}
        </Badge>
    )
}
