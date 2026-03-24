
// only accept these types of events for simplicty
export type EventType = "PushEvent" | "PullRequestEvent" | "WatchEvent" | "ForkEvent" | "PullRequestReviewEvent" | "CreateEvent"

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
    type: "PushEvent",
    commits: {
            sha: string;
            author: {
                email: string;
                name: string;
            };
            commit: {
                author: {
                    name: string;
                    email: string;
                };
                message: string;
                url: string;
            };
            distinct: boolean;
            url: string;
        }[];
    payload: {
        push_id: number;
        size: number;
        distinct_size: number;
        ref: string; 
        head: string;
        before: string;
        
    };
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

export type PullRequestReviewEvent = BaseEvent & {
    type: "PullRequestReviewEvent",
    repo: {
    name: string
    },
    payload: {
        action: "submitted" | "edited" | "dismissed"
        review: {
            state: "approved" | "request_changes" | "comment"
        }
    }
}

export type CreateEvent = BaseEvent & {
    type: "CreateEvent",
    repo: {
    name: string
    },
    payload: {
        ref_type: "repository" | "branch" | "tag"
        ref: string | null
    }
}
export type FeedEvent = PushEvent | PullRequestEvent | WatchEvent | ForkEvent | PullRequestReviewEvent | CreateEvent