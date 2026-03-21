import { signIn, signOut } from "@/lib/auth"
// log in to github

export const handleLogin = async () => {
  try {
    await signIn('github', {redirectTo: '/dashboard'});
  } catch (error) {
    console.error(error)
  }
}
// log out of github , clear sessions
export const handleLogOut = async () => {
  try {
    await signOut({redirectTo: '/'})
  } catch (error) {
    
  }
}
