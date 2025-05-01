import React from "react";
import WeeklyDashboard from '../pages/weekly_dashboard';  // Adjust the path as needed

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">📅 Welcome to the Hour Tracker</h1>
        <p className="text-lg mb-6">Track your hours and calculate salary</p>
      </div>

      {/* Add WeeklyDashboard below */}
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <WeeklyDashboard />
      </div>
    </main>
  );
}
