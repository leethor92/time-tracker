import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-3xl font-bold">Welcome to the Hours Dashboard</h1>
        <Link href="/hours_dashboard" className="mt-4 inline-block bg-blue-500 text-white p-2 rounded">
          Go to Hours Dashboard
        </Link>
      </div>
    </main>
  );
}
