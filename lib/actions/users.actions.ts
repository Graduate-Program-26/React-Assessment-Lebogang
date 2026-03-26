"use server"
import {  auth } from '@/lib/auth'
import { GitHubUser } from '@/utils/types/types'
import { FeedEvent } from '@/utils/types/feed';

import {fetchRepoCommits} from './repo.actions';

export async function fetchUsers(username: string): Promise<GitHubUser | undefined> {
    try {
        'use cache';
        const session = await auth();
        const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string
        const response = await fetch(`https://api.github.com/users/${username}`, {
            next: {
                revalidate: 86400, // revalidate every 24 hours
            },
             headers: {
                Authorization: `token ${token}`,
            },
        });

    

        if (!response.ok) {
            throw new Error(`User not found: ${response.status}`);
        }

        const data: GitHubUser = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}



export async function discoverUsers(per_page: number = 20) {
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string
    try {
        const response = await fetch(`https://api.github.com/search/users?q=followers:>1000&sort=followers&per_page=${per_page}`, {
          headers: {
                Authorization: `token ${token}`,
            },
            next: {
                revalidate: 86400
            }
        });

        const data = await response.json();
        return data.items;

    } catch (error) {
        console.error(error)
        return [];
    }
}

// for full profiles for callers that need bio/updated_at
export async function discoverUsersEnriched(per_page: number = 20): Promise<GitHubUser[]> {
    const session = await auth()
    const token = session?.accessToken || process.env.GITHUB_PAT

    try {
        const users = await discoverUsers(per_page)

        const profiles = await Promise.all(
            users.map((user: { login: string }) =>
                fetch(`https://api.github.com/users/${user.login}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    next: { revalidate: 3600 },     // profiles cached 1h each
                }).then(res => res.json())
            )
        )

        return profiles;
    } catch (error) {
        console.error("[discoverUsersEnriched]", error)
        return []
    }
}



export async function fetchUserEvents({username,
  pageParam = 1, 
  per_page = 10 
}: { 
  username?: string; 
  pageParam?: number; 
  per_page?: number 
}) : Promise<FeedEvent[] | undefined> {
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string
    const url = username 
        ? `https://api.github.com/users/${username}/events/public?page=${pageParam}&per_page=${per_page}`
        : `https://api.github.com/events?per_page=${per_page}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `token ${token}`,
            },
            next: { revalidate: username ? 0 : 120 } 
        });
        if (!response.ok) throw new Error("Failed to fetch events");

        // merge with repo commits if it's a push event
        const events: FeedEvent[] = await response.json();

        const enrichedEvents = await Promise.all(events.map(async (event) => {
            if (event.type === "PushEvent") {
                const [owner, repo] = event.repo.name.split("/");
                const commits = await fetchRepoCommits(owner, repo);
                return { ...event, commits };
            }
            return event;
        }));
        const data: FeedEvent[] = enrichedEvents; // what a painful exp this was :()
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
