
import SuggestedDev from "./SuggestedDev";
import {
    ItemGroup
} from "@/components/ui/item"


import { SuggestedDevProp } from "./SuggestedDev";

import { mockSuggestions } from "@/lib/mock/data";
export default function SuggestedDevs() {
    const suggestions: SuggestedDevProp[] = mockSuggestions
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