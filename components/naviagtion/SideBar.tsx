"use server"

import { auth } from "@/lib/auth"

import { redirect } from "next/navigation"
import SideBarClient from "./SideBarClient"

export default async function SideBar() {
  const session = await auth();

        if (!session) redirect("/");
    
        const user = {
            name: session.user?.name ?? "",
            username: session.user?.username ?? "",
            image: session.user?.image ?? "",
            accessToken: session.accessToken,
        }
   

    return (
        <SideBarClient user={user}/>
    )
}