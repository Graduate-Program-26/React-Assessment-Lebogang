"use server"

import { auth } from "@/lib/auth"

import { redirect } from "next/navigation"
import BottomBarClient from "./BottomBarClient";

export default async function BottomBar() {
  const session = await auth();

        if (!session) redirect("/");
    
        const user = {
            name: session.user?.name ?? "",
            username: session.user?.username ?? "",
            image: session.user?.image ?? "",
            accessToken: session.accessToken,
        }
   

    return (
        <BottomBarClient user={user}/>
    )
}