import { redirect } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/components/naviagtion/NavBar";
import SideBar from "@/components/naviagtion/SideBar";
import BottomBar from "@/components/naviagtion/BottomBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/lib/auth";
export default async function AppLayout({ children }: { children: React.ReactNode }) {

    const session = await auth()

    if (!session) {
        redirect("/")
    }

    const user = {
        name: session.user?.name ?? "",
        username: session.user?.username ?? "",
        image: session.user?.image ?? "",
        accessToken: session.accessToken,
    }

    return (
        <TooltipProvider>
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    <aside className="hidden md:flex">
                        <SideBar user={user} />
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
            </SidebarProvider>
        </TooltipProvider>
    )
}