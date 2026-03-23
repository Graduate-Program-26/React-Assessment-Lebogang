"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    SidebarMenu
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Search, Bell, Activity, LogOut, User, Moon, Sun } from "lucide-react";
const links = [
    { href: "/dashboard", label: "Feed", icon: Home },
    { href: "/explore", label: "Explore", icon: Search },
    { href: "/profile/name", label: "Profile", icon: User },
]

import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link"
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

// desktop view 
export default function SideBar() {
    const pathname = usePathname();
    const { setTheme, resolvedTheme, } = useTheme();
    const handleThemeToggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");


    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarHeader className="border-b border-border px-2 py-3">
                <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-base group-data-[collapsible=icon]:hidden">
                        GitGram
                    </span>
                    <SidebarTrigger className="data-[state=open]:rotate-180" />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup title="Main">
                    {links.map((link) => (
                        <SidebarMenuItem key={link.href}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === link.href}
                                tooltip={link.label}
                            >
                                <Link href={link.href}>
                                    <link.icon className="w-4 h-4" />
                                    <span>{link.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                    <SidebarMenuItem>
                        <Button variant="outline" size="icon" onClick={handleThemeToggle} className="mt-1">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarGroup>
            </SidebarContent>


            <SidebarFooter className="border-t border-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Logout">
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}