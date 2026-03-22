// app/(app)/explore/_components/ExploreClient.tsx
"use client"

import { useState } from "react"
import SearchBar from "@/components/shared/SearchBar"
import EmptyState from "@/app/(app)/explore/_components/empty_state/EmptyState"
import ProfileResults from "@/app/(app)/explore/_components/searched_content/ProfileResults"
import RepoResults from "@/app/(app)/explore/_components/searched_content/RepoResults"
import { Badge } from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

type Filter = "all" | "repos" | "devs"

export default function Home() {
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState<Filter>("all")

    const isSearching = query.trim().length > 0

    return (
        <div className="flex flex-col gap-6">
            <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search repos, devs, languages..."
            />

            {isSearching && (
                <div className="flex justify-center gap-2">
                    <Tabs onValueChange={(value) => setFilter(value as Filter)}>
                        <TabsList className="bg-transparent border-b-2 border-muted">
                            <TabsTrigger value="all" className="data-[state=active]:border-primary data-[state=active]:border-b-2">
                                All
                            </TabsTrigger>
                            <TabsTrigger value="repos" className="data-[state=active]:border-primary data-[state=active]:border-b-2">
                                Repos
                            </TabsTrigger>
                            <TabsTrigger value="devs" className="data-[state=active]:border-primary data-[state=active]:border-b-2">
                                Devs
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Badge variant="outline">{filter === "all" ? "Showing all results" : `Filtering by ${filter}`}</Badge>
                </div>
            )}

            {!isSearching ? (
                <EmptyState hasQuery={false} />
            ) : (
                <div className="flex flex-col gap-8">
                    {(filter === "all" || filter === "devs") && (
                        <ProfileResults query={query} />
                    )}
                    {(filter === "all" || filter === "repos") && (
                        <RepoResults query={query} />
                    )}
                </div>
            )}
        </div>
    )
}