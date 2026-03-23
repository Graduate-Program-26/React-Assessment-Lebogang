import { handlers, auth } from '@/lib/auth'
import { GitHubUser } from '@/utils/types/types'


// fetch user data from github (unauthed)
export async function fetchUsers(username: string): Promise<GitHubUser | undefined> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

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
export async function fetchUserFollowers(username :string) {
        try {
        const response = await fetch(`https://api.github.com/users/${username}/followers`);

        return response.json();
    } catch (error) {
        console.error(error)
    }
}
// fetch user following from github
export async function fetchUserFollowing(username :string) {
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
export async function fetchContributionCalendar(username: string)   {// githubGraphQL
      try {
        const response = await fetch(`https://api.github.com/users/${username}/following`); // @ TODO, not sure here
        return response.json();
    } catch (error) {
        console.error(error);
    }

}
export async function fetchUserEvents(username: string, per_page?: number) {
  try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public`);
        return response.json();
    } catch (error) {
        console.error(error);
    }


}