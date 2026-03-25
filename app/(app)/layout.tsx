"use server"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import AppProviders from "@/components/Providers"
import SideBar from "@/components/naviagtion/SideBar"
import BottomBar from  "@/components/naviagtion/BottomBar"
import { Suspense } from "react"
export default async  function AppLayout({ children }: { children: React.ReactNode }) {


    return (
        <AppProviders>
            <div className="flex min-h-screen w-full">
                <aside className="hidden md:flex">
                    <Suspense>
                    <SideBar />
                    </Suspense>
                </aside>

                <div className="flex flex-1 flex-col">
                    <main className="flex-1 pt-13 pb-20 md:pb-0">
                        {children}
                    </main>
                </div>

                <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background">
                    <BottomBar />
                </nav>
            </div>
        </AppProviders>
    )
}
