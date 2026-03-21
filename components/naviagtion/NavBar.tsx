
'use client'
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"

export default function Navbar() {
    const { setTheme, resolvedTheme,  } = useTheme();
    const handleThemeToggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-lg font-bold">GitGram</div>
                <div className="flex space-x-4">                    
                    <Button variant="outline" size="icon" onClick={handleThemeToggle}>
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}