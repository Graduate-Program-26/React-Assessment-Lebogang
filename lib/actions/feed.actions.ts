

import { auth } from '@/lib/auth'
import { FeedEvent, EventType } from '@/utils/types/feed'


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

import { searchRepos } from './explore.actions';
import { fetchUserEvents } from './users.actions';
export async function getTrendingFeed(per_page = 20, pageParam = 1) {
    try {
        const [repos, events] = await Promise.all([
            searchRepos('stars:>10000', { sort: 'stars', per_page: per_page ,pageParam}),
            fetchUserEvents({ username: undefined, per_page: per_page, pageParam })
        ]); 
        
        return { repos, events };
    } catch (error) {
        console.error(error);
        return { repos: [], events: [] };
    }
}