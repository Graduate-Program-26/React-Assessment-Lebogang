
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, Pin, Activity } from "lucide-react"

import ProfileHeader from "../_components/ProfileHeader"
import ProfileFeed from "../_components/ProfileFeed"
import PinnedFeed from "../_components/PinnedFeed"
import ActivityFeed from "../_components/ActivityFeed"
import Loading from "./loading"
import { Suspense } from "react"

export default function ProfilePage() {

    return (
        <Suspense fallback={<Loading />}>
            <div className="w-full max-w-5xl mx-auto text-lg">

                <ProfileHeader />

                <Tabs defaultValue="grid">
                    <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto p-0">
                        <TabsTrigger
                            value="grid"
                            className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-3 text-xs font-semibold text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            <Grid className="w-3.5 h-3.5" />
                        </TabsTrigger>
                        <TabsTrigger
                            value="pinned"
                            className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-3 text-xs font-semibold text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            <Pin className="w-3.5 h-3.5" />
                        </TabsTrigger>
                        <TabsTrigger
                            value="activity"
                            className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-3 text-xs font-semibold text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            <Activity className="w-3.5 h-3.5" />
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="grid" className="mt-0">
                        <ProfileFeed />
                    </TabsContent>

                    <TabsContent value="pinned" className="mt-0">
                        <PinnedFeed />
                    </TabsContent>

                    <TabsContent value="activity" className="mt-0">
                        <ActivityFeed />
                    </TabsContent>
                </Tabs>

            </div>
        </Suspense>
    )
}