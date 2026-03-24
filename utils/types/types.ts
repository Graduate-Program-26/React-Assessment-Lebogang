

export interface GitHubUser {
  login: string;          // The username 
  id: number;
  node_id: string;
  avatar_url: string;     // Profile picture URL
  gravatar_id: string;
  url: string;
  html_url: string;       // Link to the GitHub profile page
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  
  name: string | null;    
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;

 
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
export interface GitHubEvent {
  // this is mad :()
}



export interface GitHubRepo {
    id: number
    name: string                        // "game-emulator"
    full_name: string                   // "LebogangMasenya/game-emulator"
    description: string | null          // can be null as seen in the response
    html_url: string                    // link to repo on GitHub
    language: string | null             // "TypeScript" — single language, not array
    topics: string[]                    // [] — for tags/badges
    fork: boolean                       // differentiates own vs contributed
    private: boolean
    visibility: "public" | "private"

    // stats
    stargazers_count: number
    forks_count: number
    watchers_count: number
    open_issues_count: number
    size: number                        // in KB

    // dates
    created_at: string
    updated_at: string
    pushed_at: string                   // last push — useful for "active recently"

    // owner — for forked repos to show original owner
    owner: {
        login: string
        avatar_url: string
        type: "User" | "Organization"
    }

    // feature flags — useful for showing badges
    has_issues: boolean
    has_discussions: boolean
    archived: boolean

    // homepage if they set one
    homepage: string | null
    default_branch: string
}