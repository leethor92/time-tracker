import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { calculateWeeklyNetPay, WeekEntry } from "../models/WeekModel";

export default function WeeklyDashboard() {
  const [weeklyData, setWeeklyData] = useState<WeekEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/weeks").then((res) => {
      setWeeklyData(res.data);
      setLoading(false);
    });
  }, [])

  if (loading) return <p>Loading weeks...</p>;

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
              key={week._id}
              className="bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300"
            >
              <Link href={`/week/${week._id}`}>
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
