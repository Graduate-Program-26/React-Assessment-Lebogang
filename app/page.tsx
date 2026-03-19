import Image from "next/image";
// landing page
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold">Welcome to GitGram</h1>
        <p className="mt-4 text-2xl">A simple social media platform for developers</p>
      </main>
    </div>
  );
}
