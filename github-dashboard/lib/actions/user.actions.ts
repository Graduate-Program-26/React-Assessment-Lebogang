import { signIn, signOut } from "@/lib/auth"
// log in to github

export const login = async () => {
  await signIn();
}
// log out of github , clear sessions
export const logOut = async () => {
    await signOut()
}
