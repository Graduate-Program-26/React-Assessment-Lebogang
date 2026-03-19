

import { auth } from '@/lib/auth'
import { FeedEvent , EventType} from '@/utils/types/feed'

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

const SUPPORTED_EVENTS: EventType[] = ["PushEvent", "PullRequestEvent", "WatchEvent", "ForkEvent"]

export async function fetchUserPublicFeed(username: string, per_page = 20) {
    const res = await fetch(`https://api.github.com/users/${username}/events/public/?per_page=${per_page}`)
    const data = await res.json()

    return data.filter((event: any) => SUPPORTED_EVENTS.includes(event.type)) as FeedEvent[]
}

export async function fetchGlobalFeed() {
    try {
        const response = await fetch(`https://api.github.com/feeds`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
    
}