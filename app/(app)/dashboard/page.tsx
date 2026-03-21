import StoriesRow from "./_components/stories_row/StoriesRow";
import SearchBar from "@/components/shared/SearchBar";
import Feed from "./_components/feed/Feed";
import SuggestedDevs from "./_components/suggested_devs/SuggestedDevs";

export default function Home() {
  return (
    <div className="w-full max-w-7.5xl mx-auto px-4">

      {/* mobile-only top elements */}
      <div className="md:hidden">
        <StoriesRow />
        <SearchBar />
      </div>

      <div className="flex gap-8">

        {/* left col — full width mobile / 60% desktop */}
        <div className="flex-1 min-w-0">
          {/* desktop-only stories + search above feed */}
          <div className="hidden md:block mb-6">
            <StoriesRow />
            <div className="mt-4">   <SearchBar /> </div>
         
          </div>
          <Feed />
        </div>

        {/* right col —  hidden on mobile */}
        <aside className="hidden md:block w-100">
          <div className="sticky top-17 flex flex-col gap-6">
            <SuggestedDevs />
          </div>
        </aside>

      </div>

    </div>
  );
}