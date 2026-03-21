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
import { Home, Search, Bell, Activity, LogOut, User } from "lucide-react";
const links = [
    { href: "/", label: "Feed", icon: Home },
    { href: "/explore", label: "Explore", icon: Search },
    { href: "/activity", label: "Activity", icon: Activity },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/profile", label: "Profile", icon: User },
]

import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link"

// desktop view 
export default function SideBar() {
    const pathname = usePathname();

    return (
        <Sidebar side="left" collapsible="icon">
           <SidebarHeader className="border-b border-border px-2 py-3">
                <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-base group-data-[collapsible=icon]:hidden">
                        Menu
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