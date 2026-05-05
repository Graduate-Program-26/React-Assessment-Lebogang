
import StoriesRow from "./_components/stories_row/StoriesRow";
import Feed from "./_components/feed/Feed";
import SuggestedDevs from "./_components/suggested_devs/SuggestedDevs";




export default function Home() {
  return (

    <div className="w-[88vw] md:w-[92vw] lg:w-11/12 max-w-7xl mx-auto px-2 md:px-0">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full py-6">

        <div className="flex flex-col col-span-2 min-w-0 w-full gap-4 md:gap-6">

          <div className="w-full overflow-auto">
            <StoriesRow />
          </div>

          {/* 2. Suggested Devs: Mobile-specific placement */}
          <div className="md:hidden flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            <SuggestedDevs />
          </div>

          {/* 3. Feed: Stretches to fill the Main Column */}
          <div className="w-full">
            <Feed />
          </div>

        </div>

        {/* Sidebar: Takes 1 of 3 columns on desktop (approx. 33% width) */}
        <aside className="hidden md:block w-full">
          <div className="sticky top-20 flex flex-col gap-6">
            <SuggestedDevs />
          </div>
        </aside>

      </div>

    </div>
  );
}