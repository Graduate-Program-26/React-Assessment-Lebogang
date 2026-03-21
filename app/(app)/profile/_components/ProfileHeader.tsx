"use client"

import { Button } from "@/components/ui/button"
import {GitBranch,  Copy, MapPin, Link2, Calendar, Github } from "lucide-react"
import StoryItem from "../../dashboard/_components/stories_row/StoryItem"
import ContributionCalender from "./ContributionCalender"
export interface ProfileHeaderProps {
    username: string
    name: string
    profilePicture: string
    bio: string
    location?: string
    blog?: string
    followersCount: number
    followingCount: number
    repoCount: number
    createdAt: string
    url: string
    isActive?: boolean
}

export default function ProfileHeader({ data }: { data: ProfileHeaderProps }) {
    const joinYear = new Date(data.createdAt).getFullYear()

    return (
        <div className="flex flex-col gap-4 p-4 ">

            {/* avatar + stats row — instagram-style */}
            <div className="flex items-start gap-6">
                <StoryItem data={{
                    avatar_url: data.profilePicture,
                    username: data.username,
                    html_url: data.url,
                    url: data.url,
                    has_story: true,
                    is_self: true,
                    is_active: data.isActive ?? false,
                }} />

                <div className="flex flex-1 justify-around pt-2">
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-lg font-bold leading-tight">{data.repoCount}</span>
                        <span className="text-xs text-muted-foreground">repos</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-lg font-bold leading-tight">
                            {data.followersCount >= 1000
                                ? `${(data.followersCount / 1000).toFixed(1)}k`
                                : data.followersCount}
                        </span>
                        <span className="text-xs text-muted-foreground">followers</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-lg font-bold leading-tight">{data.followingCount}</span>
                        <span className="text-xs text-muted-foreground">following</span>
                    </div>
                </div>
            </div>

            {/* name + bio */}
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm">{data.name}</span>
                <span className="font-mono text-xs text-muted-foreground">@{data.username}</span>
                {data.bio && (
                    <p className="text-sm text-muted-foreground leading-snug mt-1">{data.bio}</p>
                )}
            </div>

            {/* meta row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                {data.location && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {data.location}
                    </div>
                )}
                {data.blog && (
                    <a
                        href={data.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-blue-400 hover:underline"
                    >
                        <Link2 className="w-3 h-3 flex-shrink-0" />
                        {data.blog.replace(/^https?:\/\//, "")}
                    </a>
                )}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    Joined {joinYear}
                </div>
            </div>

                <div className="flex items-center gap-2 mt-4">
                    <Github className="w-4 h-4" />
                    <ContributionCalender data={[]} />
                </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => window.open(data.url, "_blank")}
                >
                    <GitBranch className="w-3.5 h-3.5" />
                    View on GitHub
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(data.url)}
                >
                    <Copy className="w-3.5 h-3.5" />
                </Button>
            </div>

        </div>
    )
}