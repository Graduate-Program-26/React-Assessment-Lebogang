"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AppProviders({ children }: { children: React.ReactNode }) {
    // useState ensures a new QueryClient per component instance, not shared
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,    // 1 min — reduces refetches
                retry: 1,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </TooltipProvider>
        </QueryClientProvider>
    )
}