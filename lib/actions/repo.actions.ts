"use server"
import { auth } from '@/lib/auth';
import { GitHubRepo } from '@/utils/types/types';

 // fetch user repositories from github
export async function fetchRepos(username: string): Promise<GitHubRepo[] | undefined> { 
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        const data: GitHubRepo[] = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }

}


export async function fetchRepo(owner: string, repo: string) {
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`,  {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        
        return response.json();
    } catch (error) {
        console.error(error)
    }

}
export async function fetchUserRepos(username: string, options?: { sort?: 'updated' | 'stars' | 'created', per_page?: number }): Promise<GitHubRepo[] | undefined> {
        const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=${options?.sort || 'updated'}&per_page=${options?.per_page || 30}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        const data: GitHubRepo[] = await response.json();
        return data;
    } catch (error) {
        console.error(error)
        return [];
    }
}
      
export async function fetchRepoLanguages(owner: string, repo: string){
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

     try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        return response.json();
    } catch (error) {
        console.error(error)
    }
}
export async function fetchRepoTopics(owner: string, repo: string) {
const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

     try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/topics`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        return response.json();
    } catch (error) {
        console.error(error)
    }
}



export async function fetchRepoActivites(owner: string, repo : string, activity_type: string) {
    // activity_type can be one of: push, force_push, branch_creation, branch_deletion, pr_merge, merge_queue_merge
    // per page and pagination can be added as options

    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

     try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/activity`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        return response.json();
    } catch (error) {
        console.error(error)
    }


}

export async function fetchRepoCommits(owner: string, repo: string) {
    const session = await auth();
    const token = session?.accessToken || process.env.GITHUB_PAT; // @TODO: check that it is not an empty string

     try {      
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        return response.json();
    } catch (error) {
        console.error(error)
    }
    
}

