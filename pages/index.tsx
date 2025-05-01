import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">📅 Welcome to the Week Dashboard</h1>
        <p className="text-lg mb-6">Track your hours and calculate salary</p>
        <Link
          href="/hours_dashboard"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105 shadow-md"
        >
          Go to Hours Dashboard
        </Link>
      </div>
    </main>
  );
}
