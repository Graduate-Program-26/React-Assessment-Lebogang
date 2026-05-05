
import StoriesRow from "./_components/stories_row/StoriesRow";
import Feed from "./_components/feed/Feed";
import SuggestedDevs from "./_components/suggested_devs/SuggestedDevs";




export default function Home() {
  return (
    <div className="w-full max-w-7xl px-4 ">

      {/* Main Layout Container: Stacks on mobile, forms a side-by-side row on desktop */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">

        {/* Main Column Wrapper */}
        <div className="flex flex-col flex-1 min-w-0 w-full">

          {/* 1. Stories */}
          <div className="mb-4 md:mb-6 w-full max-w-2xl md:max-w-full overflow-auto">
            <StoriesRow />
          </div>

          {/* 2. Suggested Devs: Mobile-specific placement */}
          <div className="w-full max-w-2xl md:hidden mb-6 flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            <SuggestedDevs />
          </div>

          {/* 3. Feed */}
          <div className="w-full max-w-2xl md:max-w-full">
            <Feed />
          </div>

        </div>

        {/* 4. Sidebar: Desktop only, sits alongside the main column */}
        <aside className="hidden md:block w-xs shrink-0">
          <div className="sticky top-20 flex flex-col gap-6">
            <SuggestedDevs />
          </div>
        </aside>

      </div>

    </div>
  );
}