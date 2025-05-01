import React, { useState } from "react";
import { DayEntry } from "../models/DayModel";  // Import DayEntry
import { WeekEntry } from "../models/WeekModel";  // Import WeekEntry
import { daysOfWeek } from "../utils/constants";  // Ensure you have this constant

interface HoursDashboardProps {
  weekData: WeekEntry;  // Expect WeekEntry type
}

export default function HoursDashboard({ weekData }: HoursDashboardProps) {
  const [hours, setHours] = useState<Record<string, DayEntry>>(weekData.hours);  // Initialize state with weekData.hours

  const handleChange = (day: string, field: "start" | "end" | "break", value: string) => {
    const updatedDay = {
      ...hours[day],
      [field]: field === "break" ? parseInt(value || "0") : value,  // Correct handling of break field as number
    };

    // Recalculate the total based on the start, end, and break values
    updatedDay.total = calculateTotal(updatedDay.start, updatedDay.end, updatedDay.break);

    // Update the state
    setHours(prev => ({ ...prev, [day]: updatedDay }));
  };

  const calculateTotal = (start: string, end: string, breakMinutes: number): number => {
    const startDate = new Date(`1970-01-01T${start}:00Z`);
    const endDate = new Date(`1970-01-01T${end}:00Z`);
    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);  // Total in hours
    return Math.max(0, diff - breakMinutes / 60);  // Subtract break time in hours
  };

  const weeklyTotal = Object.values(hours).reduce((sum, day) => sum + day.total, 0);

  return (
    <div className="p-8 bg-orange-50 min-h-screen text-slate-800">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Hours Dashboard</h1>
      <table className="table-auto w-full border-collapse border border-amber-400 shadow-md">
        <thead>
          <tr className="bg-orange-500 text-white font-bold">
            <th className="border border-amber-400 px-4 py-2 text-left">Day</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Start</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Break (mins)</th>
            <th className="border border-amber-400 px-4 py-2 text-left">End</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Total (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, index) => (
            <tr key={day} className={index % 2 === 0 ? "bg-orange-100" : "bg-amber-100"}>
              <td className="border border-amber-400 px-4 py-2">{day}</td>
              <td className="border border-amber-400 px-4 py-2">
                <input
                  type="time"
                  value={hours[day].start}
                  onChange={e => handleChange(day, "start", e.target.value)}
                  className="border border-amber-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-300 rounded p-1"
                />
              </td>
              <td className="border border-amber-400 px-4 py-2">
                <input
                  type="number"
                  value={hours[day].break === 0 ? "" : hours[day].break}
                  min="0"
                  className="border border-amber-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-300 rounded p-1 w-20"
                  onChange={e => handleChange(day, "break", e.target.value)}
                />
              </td>
              <td className="border border-amber-400 px-4 py-2">
                <input
                  type="time"
                  value={hours[day].end}
                  onChange={e => handleChange(day, "end", e.target.value)}
                  className="border border-amber-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-300 rounded p-1"
                />
              </td>
              <td className="border border-amber-400 px-4 py-2">
                {hours[day].total.toFixed(2)}
              </td>
            </tr>
          ))}
          <tr className="font-bold bg-emerald-100 text-emerald-800">
            <td colSpan={4} className="border border-amber-400 px-4 py-2 text-right">
              Weekly Total
            </td>
            <td className="border border-amber-400 px-4 py-2">{weeklyTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
