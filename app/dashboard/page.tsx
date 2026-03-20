import StoriesRow from "./_components/stories_row/StoriesRow";
import SearchBar from "@/components/shared/SearchBar";
import Feed from "./_components/feed/Feed";
import SuggestedDevs from "./_components/suggested_devs/SuggestedDevs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StoriesRow />
      <SearchBar />
      <Feed />

      <SuggestedDevs />
    </main>
  );
}