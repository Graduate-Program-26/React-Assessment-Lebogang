import ProfileCard from "@/components/shared/ProfileCard"

import { mockSearchResults } from "@/lib/mock/data"   

export default function ProfileResults({query} : {query: string}) { // would be username or name and search

    return (
        <div className="p-4">
            
            <div className="grid grid-cols-3 gap-4">
                {mockSearchResults.map(profile => (
                    <ProfileCard key={profile.id} data={profile} />
                ))}
            </div>
        </div>
    )
}