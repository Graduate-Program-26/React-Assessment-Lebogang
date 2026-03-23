"use client"

import { useState } from "react"
import { Star, GitFork, GitPullRequest, CircleDot } from "lucide-react"
import { GitHubRepo } from "@/utils/types/types"
import { LANGUAGE_COLORS } from "@/lib/constants/language_colors"
import { Badge } from "@/components/ui/badge"
import clsx from "clsx"


/// needs a new way to check if contributed to repo and open issues/pr
export default function RepoCard({ repo }: { repo: GitHubRepo }) {
    const [hovered, setHovered] = useState(false)
    const primaryLang = repo.languages[0] ?? ""
    const langColor = LANGUAGE_COLORS[primaryLang] ?? "#8b949e"

    return (
        <div
            className="relative h-48 cursor-pointer overflow-hidden bg-card border-border"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className="absolute inset-x-0 top-0 h-0.75"
                style={{ background: langColor }}
            />

            <div className={clsx(
                "absolute inset-0 flex flex-col justify-between p-3 pt-4 transition-opacity duration-200",
                hovered ? "opacity-0" : "opacity-100"
            )}>
                <div className="flex items-start justify-between gap-1">
                    <span className="font-mono text-4xl font-semibold text-foreground  line-clamp-1">
                        {repo.name}
                    </span>
                    {repo.owner && (
                        <span className="flex align-text text-1xl text-muted-foreground font-mono">
                            {repo.owner}
                        </span>
                    )}

                </div>

                {repo.description && (
                    <p className="text-2xl text-muted-foreground leading-tight line-clamp-3 flex-1 my-1.5">
                        {repo.description}
                    </p>
                )}

                <div className="flex flex-wrap gap-1">
                    {repo.languages.slice(0, 2).map(lang => (
                        <div key={lang} className="flex items-center gap-1">
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: LANGUAGE_COLORS[lang] ?? "#8b949e" }}
                            />
                            <span className="text-1xl text-muted-foreground font-mono">
                                {lang}
                            </span>
                        </div>
                    ))}
                    {repo.languages.length > 2 && (
                        <span className="text-2xl text-muted-foreground">
                            +{repo.languages.length - 2}
                        </span>
                    )}


                </div>
            </div>

            <div className={clsx(
                "absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-3 transition-opacity duration-200",
                hovered ? "opacity-100" : "opacity-0"
            )}>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                    <div className="flex flex-col items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="font-mono text-[10px] font-semibold">
                            {repo.stargazers_count >= 1000
                                ? `${(repo.stargazers_count / 1000).toFixed(1)}k`
                                : repo.stargazers_count}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <CircleDot className="w-3.5 h-3.5 text-green-400" />
                        <span className="font-mono text-[10px] font-semibold">
                            {repo.issues_count ?? 0}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
                        <span className="font-mono text-[10px] font-semibold">
                            {repo.pr_count ?? 0}
                        </span>
                    </div>
                    {repo.fork && (

                        <div className="flex flex-col items-center gap-0.5">
                            <Badge
                                variant="secondary"
                                className="text-[8px] px-1 py-0 h-4 font-mono"
                            >
                                <GitFork /> fork
                            </Badge>
                        </div>

                    )}
                </div>


            </div>
        </div>
    )
}