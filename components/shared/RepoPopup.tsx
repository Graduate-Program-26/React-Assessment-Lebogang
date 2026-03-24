import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Card, CardFooter, CardContent, CardAction } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { LANGUAGE_COLORS } from "@/lib/constants/language_colors"
import { fetchRepo } from "@/lib/actions/repo.actions"
import { useEffect, useState } from "react"
import { GitHubRepo } from "@/utils/types/types"
import { Star, GitFork, CircleDot, Github, Calendar, RefreshCw } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import { RepoPopupSkeleton } from "./RepoPopupSkeleton"
export default function RepoPopup({ repo_name, owner }: { repo_name: string; owner: string }) {
    const [repoData, setRepoData] = useState<GitHubRepo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getRepoData() {
            const data = await fetchRepo(owner, repo_name);
            setRepoData(data);
            setLoading(false);
        }
        getRepoData();
    }, [owner, repo_name]);


    if (!repoData || loading) {
        return (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{repo_name}</DialogTitle>
                    <DialogDescription>
                        <Skeleton className="h-4 w-36" />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        )
    }

    const langColor = repoData.language ? LANGUAGE_COLORS[repoData.language] : "#8b949e"

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-mono text-base">
                    <span className="text-muted-foreground">{owner}/</span>
                    {repo_name}
                </DialogTitle>
                <DialogDescription className="mt-1 line-clamp-2">
                    {loading ? <Skeleton className="h-4 w-48" /> : (repoData?.description ?? "No description")}
                </DialogDescription>
                    {repoData?.language && (
                        <Badge
                            variant="secondary"
                            className=" gap-1.5 font-mono text-xs"
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ background: langColor }}
                            />
                            {repoData.language}
                        </Badge>
                    )}
               
        </DialogHeader>

            {
        loading ? (
            <RepoPopupSkeleton />
        ) : (
            <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center gap-5 text-sm text-muted-foreground border border-border rounded-lg px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="font-mono font-medium text-foreground">
                            {repoData?.stargazers_count?.toLocaleString() ?? 0}
                        </span>
                        <span>stars</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <GitFork className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-mono font-medium text-foreground">
                            {repoData?.forks_count?.toLocaleString() ?? 0}
                        </span>
                        <span>forks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CircleDot className="w-3.5 h-3.5 text-green-400" />
                        <span className="font-mono font-medium text-foreground">
                            {repoData?.open_issues_count ?? 0}
                        </span>
                        <span>issues</span>
                    </div>
                </div>

                {/* dates */}
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Created{" "}
                            <span className="text-foreground">
                                {new Date(repoData?.created_at ?? "").toLocaleDateString("en-GB", {
                                    day: "numeric", month: "short", year: "numeric"
                                })}
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Updated{" "}
                            <span className="text-foreground">
                                {new Date(repoData?.updated_at ?? "").toLocaleDateString("en-GB", {
                                    day: "numeric", month: "short", year: "numeric"
                                })}
                            </span>
                        </span>
                    </div>
                </div>



                <a href={repoData?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                >
                    <Button variant="outline" className="w-full gap-2">
                        <Github className="w-4 h-4" />
                        View on GitHub
                    </Button>
                </a>

            </div>
        )
    }
        </DialogContent >
                    
    )
}