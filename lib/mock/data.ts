import { StoryItemProp } from "@/app/(app)/dashboard/_components/stories_row/StoryItem";
import { FeedEvent } from "@/utils/types/feed";
import { SuggestedDevProp } from "@/app/(app)/dashboard/_components/suggested_devs/SuggestedDev";


export const mockFeedEvents: FeedEvent[] = [
    {
        id: "1",
        type: "PushEvent",
        created_at: new Date(Date.now() - 8 * 60000).toISOString(), // 8 mins ago
        actor: {
            login: "torvalds",
            avatar_url: "https://avatars.githubusercontent.com/u/1024025",
        },
        repo: { name: "torvalds/linux" },
        payload: {
            ref: "refs/heads/main",
            commits: [
                { sha: "a1b2c3d", message: "fix: memory barrier handling in arch/x86/kernel" },
                { sha: "e4f5g6h", message: "refactor: clean up mce_handle_error" },
                { sha: "i7j8k9l", message: "docs: update kernel param documentation" },
            ],
        },
    },
    {
        id: "2",
        type: "PullRequestEvent",
        created_at: new Date(Date.now() - 34 * 60000).toISOString(), // 34 mins ago
        actor: {
            login: "yyx990803",
            avatar_url: "https://avatars.githubusercontent.com/u/499550",
        },
        repo: { name: "vuejs/core" },
        payload: {
            action: "merged",
            pull_request: {
                title: "feat: async component setup with suspense boundary improvements",
                number: 9441,
                merged: true,
            },
        },
    },
    {
        id: "3",
        type: "WatchEvent",
        created_at: new Date(Date.now() - 60 * 60000).toISOString(), // 1 hour ago
        actor: {
            login: "matklad",
            avatar_url: "https://avatars.githubusercontent.com/u/1711539",
        },
        repo: { name: "rust-lang/rust" },
        payload: { action: "started" },
    },
    {
        id: "4",
        type: "PushEvent",
        created_at: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
        actor: {
            login: "gvanrossum",
            avatar_url: "https://avatars.githubusercontent.com/u/2495722",
        },
        repo: { name: "python/cpython" },
        payload: {
            ref: "refs/heads/main",
            commits: [
                { sha: "m1n2o3p", message: "gh-119: improve TypeVar bound checking with recursive generics" },
                { sha: "q4r5s6t", message: "typing: add test cases for PEP 695 type params" },
            ],
        },
    },
    {
        id: "5",
        type: "ForkEvent",
        created_at: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
        actor: {
            login: "nicolo-ribaudo",
            avatar_url: "https://avatars.githubusercontent.com/u/7000710",
        },
        repo: { name: "babel/babel" },
        payload: {
            forkee: { full_name: "nicolo-ribaudo/babel" },
        },
    },
    {
        id: "6",
        type: "PullRequestEvent",
        created_at: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
        actor: {
            login: "shadcn",
            avatar_url: "https://avatars.githubusercontent.com/u/124599",
        },
        repo: { name: "shadcn/ui" },
        payload: {
            action: "opened",
            pull_request: {
                title: "feat: add new sidebar collapsible animation variants",
                number: 3821,
                merged: false,
            },
        },
    },
    {
        id: "7",
        type: "WatchEvent",
        created_at: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
        actor: {
            login: "ry",
            avatar_url: "https://avatars.githubusercontent.com/u/80?v=4",
        },
        repo: { name: "denoland/deno" },
        payload: { action: "started" },
    },
    {
        id: "8",
        type: "PushEvent",
        created_at: new Date(Date.now() - 6 * 3600000).toISOString(), // 6 hours ago
        actor: {
            login: "matklad",
            avatar_url: "https://avatars.githubusercontent.com/u/1711539",
        },
        repo: { name: "rust-lang/rust-analyzer" },
        payload: {
            ref: "refs/heads/master",
            commits: [
                { sha: "u7v8w9x", message: "perf: speed up flycheck by batching diagnostics" },
            ],
        },
    },
    {
        id: "9",
        type: "ForkEvent",
        created_at: new Date(Date.now() - 7 * 3600000).toISOString(), // 7 hours ago
        actor: {
            login: "yyx990803",
            avatar_url: "https://avatars.githubusercontent.com/u/499550",
        },
        repo: { name: "vitejs/vite" },
        payload: {
            forkee: { full_name: "yyx990803/vite" },
        },
    },
    {
        id: "10",
        type: "PullRequestEvent",
        created_at: new Date(Date.now() - 8 * 3600000).toISOString(), // 8 hours ago
        actor: {
            login: "gvanrossum",
            avatar_url: "https://avatars.githubusercontent.com/u/2495722",
        },
        repo: { name: "microsoft/pyright" },
        payload: {
            action: "closed",
            pull_request: {
                title: "fix: narrowing of TypeVar with bound in conditional expressions",
                number: 7103,
                merged: false,
            },
        },
    },
]

export const mockStories: StoryItemProp[] = [
    {
        username: "arivera",
        avatar_url: "https://avatars.githubusercontent.com/u/583231",
        html_url: "https://github.com/arivera",
        url: "https://api.github.com/users/arivera",
        has_story: true,
        is_self: true,
        is_active: true,
    },
    {
        username: "torvalds",
        avatar_url: "https://avatars.githubusercontent.com/u/1024025",
        html_url: "https://github.com/torvalds",
        url: "https://api.github.com/users/torvalds",
        has_story: true,
        is_active: true,
    },
    {
        username: "gvanrossum",
        avatar_url: "https://avatars.githubusercontent.com/u/2495722",
        html_url: "https://github.com/gvanrossum",
        url: "https://api.github.com/users/gvanrossum",
        has_story: true,
        is_active: false,
    },
    {
        username: "yyx990803",
        avatar_url: "https://avatars.githubusercontent.com/u/499550",
        html_url: "https://github.com/yyx990803",
        url: "https://api.github.com/users/yyx990803",
        has_story: true,
        is_active: true,
    },
    {
        username: "matklad",
        avatar_url: "https://avatars.githubusercontent.com/u/1711539",
        html_url: "https://github.com/matklad",
        url: "https://api.github.com/users/matklad",
        has_story: false,
        is_active: false,
    },
    {
        username: "shadcn",
        avatar_url: "https://avatars.githubusercontent.com/u/124599",
        html_url: "https://github.com/shadcn",
        url: "https://api.github.com/users/shadcn",
        has_story: true,
        is_active: true,
    },
    {
        username: "nicolo-ribaudo",
        avatar_url: "https://avatars.githubusercontent.com/u/7000710",
        html_url: "https://github.com/nicolo-ribaudo",
        url: "https://api.github.com/users/nicolo-ribaudo",
        has_story: false,
        is_active: false,
    },
    {
        username: "ry",
        avatar_url: "https://avatars.githubusercontent.com/u/80",
        html_url: "https://github.com/ry",
        url: "https://api.github.com/users/ry",
        has_story: true,
        is_active: false,
    },
    {
        username: "antoniojs",
        avatar_url: "https://avatars.githubusercontent.com/u/2299345",
        html_url: "https://github.com/antoniojs",
        url: "https://api.github.com/users/antoniojs",
        has_story: true,
        is_active: true,
    },
    {
        username: "gaearon",
        avatar_url: "https://avatars.githubusercontent.com/u/810438",
        html_url: "https://github.com/gaearon",
        url: "https://api.github.com/users/gaearon",
        has_story: true,
        is_active: true,
    },
    {
        username: "sindresorhus",
        avatar_url: "https://avatars.githubusercontent.com/u/170270",
        html_url: "https://github.com/sindresorhus",
        url: "https://api.github.com/users/sindresorhus",
        has_story: true,
        is_active: true,
    },
    {
        username: "getify",
        avatar_url: "https://avatars.githubusercontent.com/u/150330",
        html_url: "https://github.com/getify",
        url: "https://api.github.com/users/getify",
        has_story: true,
        is_active: true,
    }
]

export const mockSuggestions: SuggestedDevProp[] = [
    {
        username: "matklad",
        avatar_url: "https://avatars.githubusercontent.com/u/1711539",
        bio: "Rust tooling, rust-analyzer, ziglang",
        url: "https://api.github.com/users/matklad",
    },
    {
        username: "ry",
        avatar_url: "https://avatars.githubusercontent.com/u/80",
        bio: "Creator of Deno and Node.js",
        url: "https://api.github.com/users/ry",
    },
    {
        username: "nicolo-ribaudo",
        avatar_url: "https://avatars.githubusercontent.com/u/7000710",
        bio: "TC39 delegate, Babel core team",
        url: "https://api.github.com/users/nicolo-ribaudo",
    },
    {
        username: "shadcn",
        avatar_url: "https://avatars.githubusercontent.com/u/124599",
        bio: "Building shadcn/ui and v0",
        url: "https://api.github.com/users/shadcn",
    },
    {
        username: "antoniojs",
        avatar_url: "https://avatars.githubusercontent.com/u/2299345",
        bio: "Open source, Next.js contributor",
        url: "https://api.github.com/users/antoniojs",
    },
]