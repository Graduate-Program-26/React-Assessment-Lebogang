"use server"
import {  auth } from '@/lib/auth'
import { GitHubUser } from '@/utils/types/types'
import { cacheLife } from 'next/cache';
import { FeedEvent } from '@/utils/types/feed';

import {fetchRepoCommits} from './repo.actions';
// fetch user data from github (unauthed)
export async function fetchUsers(username: string): Promise<GitHubUser | undefined> {
    try {
        'use cache';
        const response = await fetch(`https://api.github.com/users/${username}`, {
            next: {
                revalidate: 86400, // revalidate every 24 hours
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

export async function fetchUserInfo() {
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

    try {
        const response = await fetch(`https://api.github.com/user`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function discoverUsers() {
    try {
        const response = await fetch(`https://api.github.com/users`);
        // get only a few (pagination)
        return response.json();
    } catch (error) {
        console.error(error)
    }
}



// fetch user followers from github
export async function fetchUserFollowers(username: string) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/followers`);

        return response.json();
    } catch (error) {
        console.error(error)
    }
}
// fetch user following from github
export async function fetchUserFollowing(username: string) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/following`);

        return response.json();
    } catch (error) {
        console.error(error)
    }
}


export async function fetchIsFollowing(username: string, target_user: string) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/following/${target_user}`);
        const data = response.json();
        console.log(data);
        const isFollowing = true; // coerce the type gang

        /*
        if the user follows the target user
        Status: 204 
        
        else 404*/
        return isFollowing;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchUserEvents({username,
  pageParam = 1, 
  per_page = 10 
}: { 
  username: string; 
  pageParam?: number; 
  per_page?: number 
}) : Promise<FeedEvent[] | undefined> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public?page=${pageParam}&per_page=${per_page}`);

    
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