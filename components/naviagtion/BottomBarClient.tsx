"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Home, Search,  User, Sun, Moon } from "lucide-react"; 
import { useTheme } from "next-themes"

const BASE_LINKS = [
    { href: "/dashboard", label: "Feed", icon: Home },
    { href: "/explore", label: "Explore", icon: Search },
]

export default function BottomBarClient({ user }: { user: { name: string, image: string, username: string } }) {
    const pathname = usePathname();
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

            <button
                onClick={handleThemeToggle}
                className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors text-[10px] text-muted-foreground hover:text-foreground cursor-pointer"
            >
                <div className="relative w-5 h-5 flex items-center justify-center">
                    <Sun className="w-5 h-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute w-5 h-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </div>
                <span>Theme</span>
            </button>
        </div>
    );
}