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
    
    // Safely check if it's a push event before evaluating commits
    const isPushEvent = event.type === "PushEvent";
    
    const visibleCommits = isPushEvent ? (event.commits?.slice(0, 3) || []) : [];
    const extraCommitsCount = isPushEvent ? ((event.commits?.length || 0) - visibleCommits.length) : 0;

    return (
        <Card className="w-full max-w-full overflow-hidden bg-card border border-border/60 hover:border-border/80 transition-colors shadow-sm">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0 gap-4">
                <div className="flex items-center gap-2 truncate pr-2">
                    <span className="font-mono text-xs md:text-sm font-semibold text-primary truncate">
                        {owner}/
                        <span className="text-accent-foreground">{repo}</span>
                    </span>
                </div>
                <EventBadge event={event} />
            </CardHeader>

            <CardContent className="px-4 pb-4 pt-1">
                {isPushEvent ? (
                    event.commits && event.commits.length > 0 ? (
                        <div className="flex flex-col gap-1 w-full text-xs text-muted-foreground">
                            {visibleCommits.map((commit, index) => (
                                <p 
                                    key={index} 
                                    className="truncate"
                                >
                                    {commit.commit.message}
                                </p>
                            ))}
                            {extraCommitsCount > 0 && (
                                <span className="text-[10px] text-muted-foreground/60 mt-0.5">
                                    + {extraCommitsCount} more commit{extraCommitsCount > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground italic">No commit message</p>
                    )
                ) : (
                    <p className="text-xs text-muted-foreground truncate">
                        {event.payload?.pull_request?.title || "No pull request title"}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

function EventBadge({ event }: { event: PushEvent | PullRequestEvent }) {
    if (event.type === "PushEvent") {
        const count = event.commits?.length
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
