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
        const response = await fetch(`https://api.github.com/users?per_page=${per_page}`, {
          headers: {
                Authorization: `token ${token}`,
            },
        });

        const users =  await response.json(); // get usernames
        const userArr = [];
        for(const user of users) {
            userArr.push( await fetchUsers(user.login));
        }

        // get only a few (pagination)
        if(userArr === undefined) {
            return [];
        }
        return userArr;
    } catch (error) {
        console.error(error)
        return [];
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
            next: { revalidate: username ? 0 : 60 } 
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
