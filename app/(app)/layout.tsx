import AppProviders from "@/components/Providers"
import SideBar from "@/components/naviagtion/SideBar"
import { Suspense } from "react"
import BottomBar from "@/components/naviagtion/BottomBar"

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Gitstagram | Instagram for Devs",
        template: "%s | Gitstagram",
    },
    description: " The social network for engineers.",
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProviders>
            {/* Added relative to anchor the fixed bottom bar correctly */}
            <div className="flex min-h-screen w-full bg-background relative">

                {/* Sidebar: Added "hidden" so it doesn't render or take up space on mobile screens */}
                <Suspense fallback={<div>Loading...</div>}>
                    <SideBar />
                </Suspense>


                {/* Main content column */}
                <div className="flex flex-1 flex-col">
                    <main className="flex-1 pt-8 pb-20 md:pb-0">
                        {children}
                    </main>
                </div>

                {/* Bottom Bar: Mobile only */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] border-t bg-background h-14">
                    <Suspense fallback={<div>Loading...</div>}>
                        <BottomBar />
                    </Suspense>
                </div>

            </div>
        </AppProviders>
    )
}