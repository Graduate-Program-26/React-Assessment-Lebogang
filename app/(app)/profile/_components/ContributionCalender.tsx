import { GitHubCalendar } from 'react-github-calendar';

export default function ContributionCalender({username}: {username: string}) {

    return (
        <div className='max-w-2xl'>
            <GitHubCalendar
                username={username}
                blockSize={15}
                blockMargin={5}
                fontSize={14}
            />
        </div>
    )
}