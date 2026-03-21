import { GitHubCalendar } from 'react-github-calendar';

export default function ContributionCalender({ username }: { username: string }) {
    return (
        <div className="w-80 md:w-full max-w-2xl mx-auto overflow-x-auto scrollbar-none">
            <GitHubCalendar
                username={username}
                blockSize={15}
                blockMargin={3}
                fontSize={14}
            />
        </div>
    )
}