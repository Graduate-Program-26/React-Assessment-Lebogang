"use client" // needed for usePathname and Link

import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Search, Bell, Activity, Link, Icon } from "lucide-react";
import { clsx } from "clsx";

const links = [
    { href: "/", label: "Feed", icon: Home },
    { href: "/explore", label: "Explore", icon: Search },
    { href: "/profile", label: "Profile", icon: Home },
]

export default function BottomBar() {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-around px-2 py-2">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                        "flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors",
                        pathname === link.href
                            ? "text-foreground"
                            : "text-muted-foreground"
                    )}
                >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                </Link>
            ))}
        </div>
    )
}