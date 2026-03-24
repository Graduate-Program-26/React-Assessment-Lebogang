import { GitHubUser, GitHubRepo } from "@/utils/types/types";

export async function searchRepos(query: string, options?: { language?: string, sort?: 'stars' | 'updated', per_page?: number, pageParam?: number }): Promise<GitHubRepo[]> {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}${options?.language ? `+language:${options.language}` : ''}&sort=${options?.sort || 'stars'}&per_page=${options?.per_page || 10}&page=${options?.pageParam || 1}`);

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export async function searchUsers(query: string, per_page?: number): Promise<GitHubUser[]> {
    try {
        const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=${per_page || 10}`);

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(error);
        return [];
    }

}
export async function fetchReposByTopic(topic: string, per_page?: number) {

}
export async function fetchReposByLanguage(language: string, sort?: 'stars' | 'updated', per_page?: number) {

}
export async function fetchTrendingRepos(language?: string, since?: 'daily' | 'weekly' | 'monthly') {
}

import { discoverUsers } from "@/lib/actions/users.actions";
import {type SuggestedDevProp} from "@/app/(app)/dashboard/_components/suggested_devs/SuggestedDev";
export async function suggestUsers(per_page?: number) {
    try {
        const response = await discoverUsers(per_page);

        const data : SuggestedDevProp[] = (response ?? []).filter((user): user is GitHubUser => !!user).map((user) => ({
            username: user.login,
            avatar_url: user.avatar_url,
            bio: user.bio ?? " ",
            url: user.html_url
        }));

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}