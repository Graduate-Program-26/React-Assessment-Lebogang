
'use client'
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import SearchBar from "../shared/SearchBar"

export default function Navbar() {

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-lg font-bold">GitGram</div>
                <div className="flex space-x-4">             
     
                </div>
            </div>
        </nav>
    )
}