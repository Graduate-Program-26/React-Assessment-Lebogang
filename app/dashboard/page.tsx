import StoriesRow from "./_components/stories_row/StoriesRow";
import SearchBar from "@/components/shared/SearchBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StoriesRow />
      <SearchBar />


      
    </main>
  );
}