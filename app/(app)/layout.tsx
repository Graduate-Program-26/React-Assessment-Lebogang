"use server"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import AppProviders from "@/components/Providers"
import SideBar from "@/components/naviagtion/SideBar"
import BottomBar from  "@/components/naviagtion/BottomBar"
import { Suspense } from "react"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Gitstagram | Instagram for Devs",
    template: "%s | Gitstagram", 
  },
  description: " The social network for engineers.",
};

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

        
            </div>
        </AppProviders>
    )
}
