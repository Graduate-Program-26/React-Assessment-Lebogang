

import { auth } from '@/lib/auth'


export async function fetchAuthenticatedUserFeed(per_page?: number) {
      const session = await auth();
        const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string
    
         try {
            const response = await fetch(`https://api.github.com/feeds`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });
    
            return response.json();
        } catch (error) {
            console.error(error)
        }
}
export async function fetchUserPublicFeed(username: string, per_page?: number) {
        

}

export async function fetchGlobalFeed() {
    try {
        const response = await fetch(`https://api.github.com/feeds`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
    
}