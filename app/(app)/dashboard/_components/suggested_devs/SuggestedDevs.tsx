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
                <div>Suggested Devs</div>
                <ItemGroup>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="w-full h-16 rounded-md" />
                    ))}
                </ItemGroup>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div>Suggested Devs</div>

            <ItemGroup>
                {suggestions.map((dev) => (
                    <SuggestedDev key={dev.username} data={dev} />
                ))}
            </ItemGroup>

        </div>
    )
}