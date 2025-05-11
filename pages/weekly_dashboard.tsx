import Link from "next/link";
import React from "react";
import { calculateWeeklyNetPay } from "../models/WeekModel";

export default function WeeklyDashboard() {
  // Sample weekly data
  const weeklyData = [
    {
      id: 1,
      weekStart: "2024-04-29",
      hours: {
        Monday: { start: "", end: "", break: 0, total: 8 },
        Tuesday: { start: "", end: "", break: 0, total: 7 },
        Wednesday: { start: "", end: "", break: 0, total: 8 },
        Thursday: { start: "", end: "", break: 0, total: 7 },
        Friday: { start: "", end: "", break: 0, total: 8 },
        Saturday: { start: "", end: "", break: 0, total: 0 },
        Sunday: { start: "", end: "", break: 0, total: 0 }
      },
      hourlyRates: {
        Monday: 30,
        Tuesday: 30,
        Wednesday: 30,
        Thursday: 30,
        Friday: 30,
        Saturday: 30,
        Sunday: 30
      }
    },
    {
      id: 2,
      weekStart: "2024-05-06",
      hours: {
        Monday: { start: "", end: "", break: 0, total: 8 },
        Tuesday: { start: "", end: "", break: 0, total: 7 },
        Wednesday: { start: "", end: "", break: 0, total: 8 },
        Thursday: { start: "", end: "", break: 0, total: 7 },
        Friday: { start: "", end: "", break: 0, total: 8 },
        Saturday: { start: "", end: "", break: 0, total: 0 },
        Sunday: { start: "", end: "", break: 0, total: 0 }
      },
      hourlyRates: {
        Monday: 30,
        Tuesday: 30,
        Wednesday: 30,
        Thursday: 30,
        Friday: 30,
        Saturday: 30,
        Sunday: 30
      }
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Dashboard</h1>
      <Link href="/week/new">
        <button className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          ➕ Add New Week
        </button>
      </Link>
      <ul className="space-y-4">
        {weeklyData.map((week) => {
          const weeklyTotal = Object.values(week.hours).reduce(
            (sum, day) => sum + day.total,
            0
          );

          // Calculate net total pay for the week
          const netTotalPay = calculateWeeklyNetPay(week.hours, week.hourlyRates);

          return (
            <li
              key={week.id}
              className="bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300"
            >
              <Link href={`/week/${week.id}`}>
                <h2 className="text-xl font-semibold text-blue-800">
                  Week of {week.weekStart}
                </h2>
                <p className="text-blue-600">Total Hours: {weeklyTotal.toFixed(2)}</p>
                <p className="text-blue-600">
                  Net Total Pay: ${netTotalPay.toFixed(2)}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
