
// only accept these types of events for simplicty
export type EventType = "PushEvent" | "PullRequestEvent" | "WatchEvent" | "ForkEvent"

interface BaseEvent {
    id: string
    type: EventType
    created_at: string
    actor: {
        login: string
        avatar_url: string
    }
    repo: {
        name: string   // "owner/repo"
    }
}

export interface PushEvent extends BaseEvent {
    type: "PushEvent"
    payload: {
        commits: { message: string; sha: string }[]
        ref: string    // "refs/heads/main"
    }
}

export interface PullRequestEvent extends BaseEvent {
    type: "PullRequestEvent"
    payload: {
        action: "opened" | "closed" | "merged"
        pull_request: {
            title: string
            number: number
            merged: boolean
        }
    }
}

export interface WatchEvent extends BaseEvent {
    type: "WatchEvent"
    payload: { action: "started" }
}

export interface ForkEvent extends BaseEvent {
    type: "ForkEvent"
    payload: {
        forkee: { full_name: string }
    }
}

export type FeedEvent = PushEvent | PullRequestEvent | WatchEvent | ForkEvent