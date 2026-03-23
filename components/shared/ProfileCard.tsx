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

export default function ProfileCard({data} : {data: ProfileCardProps}) {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <Avatar className="w-16 h-16 mt-4">
                <AvatarImage src={data.avatarUrl} alt={`${data.username}'s avatar`} />
                <AvatarFallback>{data.username.charAt(0)}</AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-semibold mb-2">{data.username}</h2>
            <p className="text-gray-600">{data.bio}</p>
            <p className="text-gray-600 mt-2">Repositories: {data.repositories}</p>

            <Link href={`/profile/${data.username}`}>
                <Button className="mt-4">View Profile</Button>
            </Link>
        </div>
    )
}