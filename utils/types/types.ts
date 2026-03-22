

export interface GitHubUser {
  login: string;               // Username (B-WayneZA)
  id: number;
  node_id: string;
  avatar_url: string;          // The "Profile Picture"
  gravatar_id: string;
  url: string;
  html_url: string;            // Link to actual GitHub profile
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
  name: string | null;         // Display Name (Lebogang Masenya)
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;          // "Let's build the impossible. 👨🏽‍💻🦇"
  twitter_username: string | null;
  public_repos: number;        // Repo Count
  public_gists: number;
  followers: number;           // Follower Count
  following: number;           // Following Count
  created_at: string;
  updated_at: string;
}

export interface GitHubEvent {
  // this is mad :()
}

export interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;               // Repository Name (e.g. "react-assessment")
  full_name: string;          // Full Repository Name (e.g. "B-WayneZA/react-assessment")
  private: boolean;
  owner: string;          // Owner of the repository
  html_url: string;           // Link to the repository on GitHub
  description: string | null; // Repository description
  languages: string[];          // List of languages used in the repository
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;              // Size of the repository in KB
  stargazers_count: number;   // Number of stars
  watchers_count: number;     // Number of watchers
  issues_count: number | 0;       // Number of open issues
  pr_count: number | 0;           // Number of open pull requests
}