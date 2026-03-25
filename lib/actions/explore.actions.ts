"use server"
import { GitHubUser, GitHubRepo } from "@/utils/types/types";
import { auth } from "@/lib/auth"
import { discoverUsers } from "@/lib/actions/users.actions";
import { type SuggestedDevProp } from "@/app/(app)/dashboard/_components/suggested_devs/SuggestedDev";
import { fetchRepos } from "./repo.actions";
export async function searchRepos(query: string, options?: { language?: string, sort?: 'stars' | 'updated', per_page?: number, pageParam?: number }): Promise<GitHubRepo[]> {
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}${options?.language ? `+language:${options.language}` : ''}&sort=${options?.sort || 'stars'}&per_page=${options?.per_page || 10}&page=${options?.pageParam || 1}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export async function searchUsers(query: string, per_page?: number): Promise<GitHubUser[]> {
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string    
    try {
        const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=${per_page || 10}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

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

export async function suggestUsers(per_page?: number) {
    try {
        const response = await discoverUsers(per_page);

        const data: SuggestedDevProp[] = (response ?? []).filter((user): user is GitHubUser => !!user).map((user) => ({
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

interface RepoCommits {
    commit: { message: string, author: { date: string } }
    sha: string
    repoName: string
    username: string
    created_at: string
}


export async function fetchLastSixCommits(username: string) {
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

    try {

        const repos = await fetchRepos(username, 1) || [];

        const commitMessages = repos.map(async (repo) => {
            const response = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=6`,
                { headers: { Authorization: `token ${token}` } }
            );

            if (!response.ok) return [];

            const data = await response.json();

            const formattedCommits: RepoCommits[] = data.map((c: RepoCommits) => ({
                message: c.commit.message,
                sha: c.sha,
                repoName: repo.name,
                username: username,
                created_at: c.commit.author.date // The actual commit timestamp
            }));
            return  formattedCommits;
        })



        // map commit messages to story format
        const nestedCommits = await Promise.all(commitMessages);

        return nestedCommits
            .flat()
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 20);

    } catch (error) {
        console.error(error)
        return [];
    }
}   