import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface ProfileCardProps {
    id: number;
    name: string;
    username: string;
    bio: string;
    repositories: number;
    avatarUrl: string;
}

import { GitHubUser } from "@/utils/types/types";
export default function ProfileCard({data} : {data: GitHubUser}) {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <Avatar className="w-16 h-16 mt-4">
                <AvatarImage src={data.avatar_url} alt={`${data.login}'s avatar`} />
                <AvatarFallback>{data.login.charAt(0)}</AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-semibold mb-2">{data.login}</h2>

            <Link href={`/profile/${data.login}`}>
                <Button className="mt-4">View Profile</Button>
            </Link>
        </div>
    )
}