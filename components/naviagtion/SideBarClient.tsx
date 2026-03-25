"use client"
import { usePathname } from "next/navigation"

import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
    SidebarHeader, SidebarMenuItem, SidebarMenuButton,
    SidebarTrigger, SidebarMenu
} from "@/components/ui/sidebar"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Search, Bell, Activity, LogOut, User, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { useTheme } from "next-themes"
import clsx from "clsx"
import { auth } from "@/lib/auth"

const BASE_LINKS = [
    { href: "/dashboard", label: "Feed",    icon: Home   },
    { href: "/explore",   label: "Explore", icon: Search },
]
import { redirect } from "next/navigation"

export default function SideBarClient({user}: {user: {name: string, image: string, username: string}}) {
    const pathname = usePathname()
  
    const { setTheme, resolvedTheme } = useTheme();

    const handleThemeToggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

    const links = [
        ...BASE_LINKS,
        // only add profile link once we have the username
        ...(user?.username
            ? [{ href: `/profile/${user.username}`, label: "Profile", icon: User }]
            : []
        ),
    ]


    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarHeader className="border-b border-border px-2 py-3">
                <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-base group-data-[collapsible=icon]:hidden">
                      Gitstagram
                    </span>
                    <SidebarTrigger />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {links.map((link) => (
                            <SidebarMenuItem key={link.href}>
                                <SidebarMenuButton
                                    asChild
                                    
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
                            <SidebarMenuButton
                                tooltip={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                                onClick={handleThemeToggle}
                            >
                                <Sun className="w-4 h-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute w-4 h-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                <span>Toggle theme</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border">
                <SidebarMenu>
                    {/* user info */}
                    {user && (
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={user.name ?? ""}>
                                <Avatar className="w-5 h-5">
                                    <AvatarImage src={user.image ?? ""} />
                                    <AvatarFallback className="text-[10px]">
                                        {user.name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium truncate">
                                    {user.name}
                                </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Sign out"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <span> <LogOut className="w-4 h-4" /> Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}