
import SuggestedDev from "./SuggestedDev";
import {
    ItemGroup
} from "@/components/ui/item"


import { SuggestedDevProp } from "./SuggestedDev";
export default function SuggestedDevs() {
    const suggestions: SuggestedDevProp[] = [];
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