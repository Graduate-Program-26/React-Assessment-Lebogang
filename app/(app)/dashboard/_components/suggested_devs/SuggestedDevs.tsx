"use client"
import SuggestedDev from "./SuggestedDev";
import {
    ItemGroup
} from "@/components/ui/item"


import { SuggestedDevProp } from "./SuggestedDev";
import { suggestUsers } from "@/lib/actions/explore.actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
export default function SuggestedDevs() {
    const [suggestions, setSuggestions] = useState<SuggestedDevProp[]>([]);
    
    useEffect(() => {
        const loadSuggestions = async () => {
            const data = await suggestUsers(7);
            setSuggestions(data as SuggestedDevProp[]);
        };
        loadSuggestions();
    }, []);

    if(suggestions === undefined || suggestions.length === 0) {
        return (
            <div className="space-y-4">
                <h2>Suggested Devs</h2>
                <ItemGroup>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="w-full h-16 rounded-md" />
                    ))}
                </ItemGroup>
            </div>
        )
    }

    return (
      <div className="space-y-4 w-full">
    <h2 className="text-lg font-semibold tracking-tight">Suggested Developers</h2>
    
    {/* Responsive Container: Horizontal on mobile, vertical stack on desktop */}
    <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-4 pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        {suggestions.map((dev) => (
            // Add a fixed or constrained width for the items on mobile so they don't stretch
            <div key={dev.username} className="w-[260px] md:w-full shrink-0">
                <SuggestedDev data={dev} />
            </div>
        ))}
    </div>
</div>
    )
}