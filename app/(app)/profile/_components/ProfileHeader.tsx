
"use client"
import { Button } from "@/components/ui/button"
import { GitBranch, Copy, MapPin, Link2, Calendar, Github } from "lucide-react"
import StoryItem from "../../dashboard/_components/stories_row/StoryItem"
import ContributionCalender from "./ContributionCalender"
import { useParams } from "next/navigation"
import { fetchUsers } from "@/lib/actions/users.actions"
import { useEffect, useState } from "react"
import { GitHubUser } from "@/utils/types/types"
import { ProfileHeaderSkeleton } from "./ProfileSkeletons"


export default function ProfileHeader() {
    const { username } = useParams();
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            const loadData = async () => {
                setLoading(true);
                const data = await fetchUsers(username as string);
                if (data) setUser(data);
                setLoading(false);
            };
            loadData();
        }
    }, [username]);

    if (loading) return <ProfileHeaderSkeleton />;
    
    if (!user) return (
        <div className="flex flex-col items-center gap-4 p-4">
            <Github className="w-12 h-12 text-muted-foreground" />
            <span className="text-lg font-semibold">User not found</span>
            <span className="text-sm text-muted-foreground">The user you are looking for does not exist. (Or there is an issue on our side)</span>
        </div>
    )

    const joinYear = new Date(user?.created_at || new Date()).getFullYear()

    return (
        <div className="flex flex-col gap-4 p-4 ">

            <div className="flex items-start gap-6">
                <StoryItem data={{
                    avatar_url: user?.avatar_url || "https://avatars.githubusercontent.com/u/9919?s=280&v=4", // fallback to github's octocat avatar
                    username: user?.login || "unknown user",
                    html_url: user?.html_url || "",
                    url: user?.url || "",
                    has_story: new Date(user?.updated_at).getTime() > Date.now() - 24 * 60 * 60 * 1000, // active if updated in the last 24 hours
                    is_self: true,
                    is_active: new Date(user?.updated_at).getTime() > Date.now() - 24 * 60 * 60 * 1000, // active if updated in the last 24 hours
                }} />

                <div className="flex flex-1 justify-around pt-2">
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-lg font-bold leading-tight">{user?.public_repos}</span>
                        <span className="text-xs text-muted-foreground">repos</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-lg font-bold leading-tight">
                            {user?.followers >= 1000
                                ? `${(user.followers / 1000).toFixed(1)}k`
                                : user?.followers}
                        </span>
                        <span className="text-xs text-muted-foreground">followers</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-lg font-bold leading-tight">{user?.following}</span>
                        <span className="text-xs text-muted-foreground">following</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm">{user?.name}</span>
                <span className="font-mono text-xs text-muted-foreground">@{user?.login}</span>
                {user?.bio && (
                    <p className="text-sm text-muted-foreground leading-snug mt-1">{user.bio}</p>
                )}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1">
                {user?.location && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                    </div>
                )}
                {user?.blog && (
                    <a
                        href={user.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-blue-400 hover:underline"
                    >
                        <Link2 className="w-3 h-3" />
                        {user.blog.replace(/^https?:\/\//, "")}
                    </a>
                )}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Joined {joinYear}
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <ContributionCalender username={user?.login} />
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => window.open(user?.html_url, "_blank")}
                >
                    <GitBranch className="w-3.5 h-3.5" />
                    View on GitHub
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/profile/${user?.login}`)}
                >
                    <Copy className="w-3.5 h-3.5" />
                </Button>
            </div>

        </div>
    )
}