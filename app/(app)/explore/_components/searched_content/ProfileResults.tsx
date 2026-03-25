import ProfileCard from "@/components/shared/ProfileCard"
import { searchUsers } from "@/lib/actions/explore.actions"
import { useEffect, useState } from "react"
import { ActivityFeedSkeleton } from "@/app/(app)/profile/_components/ProfileSkeletons"
import { GitHubUser } from "@/utils/types/types"

export default function ProfileResults({query} : {query: string}) { // would be username or name and search
        const [loading, setLoading] = useState(true);
        const [profiles, setProfiles] = useState<GitHubUser[]>([]);
        
        useEffect(() => {
            if (query.trim().length > 0) {
                const loadData = async () => {
                    setLoading(true);
                    const data = await searchUsers(query, 12);
                    if (data) setProfiles(data);
                    setLoading(false);
                };
                loadData();
            }
        }, [query]);

    if (loading) return <ActivityFeedSkeleton />;

    if(!profiles || profiles.length === 0) {
        return (
            <div className="text-center text-gray-500">
                No profiles found for "{query}"
            </div>
        )
    }

    return (
        <div className="p-4">
            
            <div className="grid grid-cols-3 gap-4">
                {profiles.map(profile => (
                    <ProfileCard key={profile.url} data={profile} />
                ))}
            </div>
        </div>
    )
}