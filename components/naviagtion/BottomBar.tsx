"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Home, Search, PlusSquare, Bell, User } from "lucide-react"; // Or your respective icons

const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Search },
    { href: "/profile", label: "Profile", icon: User },
];

export default function BottomBar() {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-around h-full px-2 py-1 w-full bg-background border-t">
            {links.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                            "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors text-[10px]",
                            pathname === link.href
                                ? "text-foreground font-medium"
                                : "text-muted-foreground"
                        )}
                    >
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}