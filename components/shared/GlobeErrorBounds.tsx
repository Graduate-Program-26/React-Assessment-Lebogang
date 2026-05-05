"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class GlobeErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error in Globe component:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-full w-full p-6 border rounded-lg bg-card border-border text-center">
                    <p className="text-sm font-medium text-destructive">Failed to load the 3D globe</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
                        This might be due to a graphics rendering error or unsupported browser settings.
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-4 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition"
                    >
                        Retry Loading
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}