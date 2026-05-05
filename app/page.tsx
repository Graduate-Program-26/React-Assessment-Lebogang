// seperated landing page because of The page stays a server component and handles the session redirect. 
// Everything interactive moves to a client component:
// /LandingClient.tsx — everything interactive lives here

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import LandingClient from "@/components/LandingClient"

export default async function Home() {


    return <LandingClient />
}