import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from 'next-themes';

export default function ContributionCalender({ username }: { username: string }) {
    const { resolvedTheme } = useTheme();
    
    return (
        <div className="w-80 md:w-full max-w-4xl mx-auto overflow-x-auto scrollbar-none">
            <GitHubCalendar
                username={username}
                blockSize={15}
                blockMargin={3}
                fontSize={14}
                colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    )
}