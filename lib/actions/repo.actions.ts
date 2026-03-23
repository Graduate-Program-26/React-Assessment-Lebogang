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
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        return response.json();
    } catch (error) {
        console.error(error)
    }

}
export async function fetchUserRepos(username: string, options?: { sort?: 'updated' | 'stars' | 'created', per_page?: number }){
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        /*
        sorting  options
rt string
The property to sort the results by.

Default: full_name

Can be one of: created, updated, pushed, full_name

direction string
The order to sort by. Default: asc when using full_name, otherwise desc.

Can be one of: asc, desc

per_page integer
The number of results per page (max 100). For more information, see "Using pagination in the REST API."

Default: 30

page integer
The page number of the results to fetch. For more information, see "Using pagination in the REST API."

Default: 1
        */
        return response.json();
    } catch (error) {
        console.error(error)
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

