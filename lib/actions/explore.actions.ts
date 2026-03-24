import { GitHubUser, GitHubRepo } from "@/utils/types/types";

export async function searchRepos(query: string, options?: { language?: string, sort?: 'stars' | 'updated', per_page?: number }) : Promise<GitHubRepo[]> {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}${options?.language ? `+language:${options.language}` : ''}&sort=${options?.sort || 'stars'}&per_page=${options?.per_page || 10}`);

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export async function searchUsers(query: string, per_page?: number) : Promise<GitHubUser[]> {
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
export async function fetchReposByLanguage(language: string, sort?: 'stars' | 'updated', per_page?: number){

}
export async function fetchTrendingRepos(language?: string, since?: 'daily' | 'weekly' | 'monthly') {
}
export async function discoverUsers(per_page?: number) {

}