import React, { useState } from "react";
import { DayEntry } from "../models/DayModel";
import { WeekEntry, calculateWeeklyNetPay } from "../models/WeekModel";
import { daysOfWeek } from "../utils/constants";

interface HoursDashboardProps {
  weekData: WeekEntry;
}

export default function HoursDashboard({ weekData }: HoursDashboardProps) {
  const [hours, setHours] = useState<Record<string, DayEntry>>(weekData.hours);
  const [hourlyRates, setHourlyRates] = useState<Record<string, number>>(weekData.hourlyRates);

  const handleChange = (day: string, field: "start" | "end" | "break", value: string) => {
    const updatedDay = {
      ...hours[day],
      [field]: field === "break" ? parseInt(value || "0") : value,
    };

    updatedDay.total = calculateTotal(updatedDay.start, updatedDay.end, updatedDay.break);
    setHours(prev => ({ ...prev, [day]: updatedDay }));
  };

  const handleRateChange = (day: string, value: string) => {
    const rate = parseFloat(value) || 0;
    setHourlyRates(prev => ({ ...prev, [day]: rate }));
  };

  const calculateTotal = (start: string, end: string, breakMinutes: number): number => {
    const startDate = new Date(`1970-01-01T${start}:00Z`);
    const endDate = new Date(`1970-01-01T${end}:00Z`);
    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return Math.max(0, diff - breakMinutes / 60);
  };

  const weeklyTotalHours = Object.values(hours).reduce((sum, day) => sum + day.total, 0);
  const weeklyNetPay = calculateWeeklyNetPay(hours, hourlyRates); // Use the imported function

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Hours Dashboard</h1>

      <table className="table-auto w-full border-collapse border border-amber-400 shadow-md">
        <thead>
          <tr className="bg-indigo-600 text-white font-bold">
            <th className="border border-amber-400 px-4 py-2 text-left">Day</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Start</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Break (mins)</th>
            <th className="border border-amber-400 px-4 py-2 text-left">End</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Total (hrs)</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Hourly Rate ($)</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Tax ($)</th>
            <th className="border border-amber-400 px-4 py-2 text-left">Net Daily Pay ($)</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, index) => {
            const rate = hourlyRates[day];
            const totalHours = hours[day].total;
            const dailyPay = rate * totalHours;
            const tax = dailyPay * 0.1503;
            const netPay = dailyPay - tax;

            return (
              <tr
                key={day}
                className={`${index % 2 === 0 ? "bg-indigo-100" : "bg-purple-100"} text-gray-900`}
              >
                <td className="border border-amber-400 px-4 py-2">{day}</td>
                <td className="border border-amber-400 px-4 py-2">
                  <input
                    type="time"
                    value={hours[day].start}
                    onChange={e => handleChange(day, "start", e.target.value)}
                    className="border border-amber-400 rounded p-1"
                  />
                </td>
                <td className="border border-amber-400 px-4 py-2">
                  <input
                    type="number"
                    value={hours[day].break === 0 ? "" : hours[day].break}
                    min="0"
                    onChange={e => handleChange(day, "break", e.target.value)}
                    className="border border-amber-400 rounded p-1 w-20"
                  />
                </td>
                <td className="border border-amber-400 px-4 py-2">
                  <input
                    type="time"
                    value={hours[day].end}
                    onChange={e => handleChange(day, "end", e.target.value)}
                    className="border border-amber-400 rounded p-1"
                  />
                </td>
                <td className="border border-amber-400 px-4 py-2">{totalHours.toFixed(2)}</td>
                <td className="border border-amber-400 px-4 py-2">
                  <input
                    type="number"
                    value={rate}
                    onChange={e => handleRateChange(day, e.target.value)}
                    className="border border-amber-400 rounded p-1 w-24"
                  />
                </td>
                <td className="border border-amber-400 px-4 py-2">${tax.toFixed(2)}</td>
                <td className="border border-amber-400 px-4 py-2">${netPay.toFixed(2)}</td>
              </tr>
            );
          })}
          <tr className="font-bold bg-indigo-200 text-indigo-800">
            <td colSpan={4} className="border border-amber-400 px-4 py-2 text-right">
              Weekly Total
            </td>
            <td className="border border-amber-400 px-4 py-2">{weeklyTotalHours.toFixed(2)}</td>
            <td className="border border-amber-400 px-4 py-2" colSpan={2}>Total Net Pay</td>
            <td className="border border-amber-400 px-4 py-2">${weeklyNetPay.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
