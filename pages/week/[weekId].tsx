import React, { useEffect, useState } from 'react';
import axios from "axios"
import HoursDashboard from '../../components/HoursDashboard';
import { WeekEntry } from '../../models/WeekModel'; // Assuming this is your WeekEntry type

export default function WeekDetails() {
  // Local state to hold week data (hardcoded for now)
  const [weekData, setWeekData] = useState<WeekEntry | null>(null);
  
  // Hardcoded week data for demonstration
  const weeklyData: WeekEntry[] = [
    {
      id: "1",
      weekStart: "2024-04-29",
      hours: {
        Monday: { start: "", end: "", break: 0, total: 8 },
        Tuesday: { start: "", end: "", break: 0, total: 7 },
        Wednesday: { start: "", end: "", break: 0, total: 8 },
        Thursday: { start: "", end: "", break: 0, total: 7 },
        Friday: { start: "", end: "", break: 0, total: 8 },
        Saturday: { start: "", end: "", break: 0, total: 0 },
        Sunday: { start: "", end: "", break: 0, total: 0 },
      },
      hourlyRates: {
        Monday: 30,
        Tuesday: 30,
        Wednesday: 30,
        Thursday: 30,
        Friday: 30,
        Saturday: 30,
        Sunday: 30,
      },
    },
    {
      id: "2",
      weekStart: "2024-05-06",
      hours: {
        Monday: { start: "", end: "", break: 0, total: 8 },
        Tuesday: { start: "", end: "", break: 0, total: 7 },
        Wednesday: { start: "", end: "", break: 0, total: 8 },
        Thursday: { start: "", end: "", break: 0, total: 7 },
        Friday: { start: "", end: "", break: 0, total: 8 },
        Saturday: { start: "", end: "", break: 0, total: 0 },
        Sunday: { start: "", end: "", break: 0, total: 0 },
      },
      hourlyRates: {
        Monday: 30,
        Tuesday: 30,
        Wednesday: 30,
        Thursday: 30,
        Friday: 30,
        Saturday: 30,
        Sunday: 30,
      },
    },
  ];

  // Simulate the selection of a week (for example, from a list of weeks)
  useEffect(() => {
    // Hardcoded for now, you can modify it as needed
    const fetchedWeekData = weeklyData.find((week) => week.id === "1"); // You can replace with any logic to choose the week
    if (fetchedWeekData) {
      setWeekData(fetchedWeekData);
    }
  }, []);

  // Handle saving updated week data
  const handleSave = async (updatedWeekData: WeekEntry) => {
    setWeekData(updatedWeekData);
    try {
      const response = await axios.put(`/api/weeks/${updatedWeekData.id}`, updatedWeekData);
      console.log('Week updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating week data:', error);
    }
  };

  if (!weekData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Week Details: {weekData.weekStart}</h1>
      <HoursDashboard weekData={weekData} onSave={handleSave} />
    </div>
  );
}
