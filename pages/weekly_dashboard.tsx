// src/components/WeeklyDashboard.tsx
import { useState, useEffect } from "react";
import { createEmptyWeek, WeekEntry } from "../models/WeekModel";

const WeeklyDashboard = () => {
  const [weeklyData, setWeeklyData] = useState<WeekEntry[]>([]);

  useEffect(() => {
    const data = loadWeeklyData(); // Implement this to load data from storage
    setWeeklyData(data);
  }, []);

  const handleAddNewWeek = () => {
    const newWeekStart = getNextMonday(); // Logic to calculate the next Monday
    const newWeek = createEmptyWeek(newWeekStart);
    setWeeklyData((prev) => [...prev, newWeek]);
    saveWeeklyData([...weeklyData, newWeek]); // Implement saving to storage
  };

  return (
    <div>
      <h1>Weekly Dashboard</h1>
      <button onClick={handleAddNewWeek}>Add New Week</button>
      {/* Render weekly data */}
    </div>
  );
};

const loadWeeklyData = (): WeekEntry[] => {
    return [
      {
        weekStart: "2024-04-15", // ISO date string (Monday)
        hours: {
          Monday: { start: "", end: "", break: 0, total: 0 },
          Tuesday: { start: "", end: "", break: 0, total: 0 },
          Wednesday: { start: "", end: "", break: 0, total: 0 },
          Thursday: { start: "", end: "", break: 0, total: 0 },
          Friday: { start: "", end: "", break: 0, total: 0 },
          Saturday: { start: "", end: "", break: 0, total: 0 },
          Sunday: { start: "", end: "", break: 0, total: 0 },
        },
      },
    ];
  };

const getNextMonday = () => {
    // placeholder function
    return "placeholder";
}

// WeekEntry[] is an array of WeekEntry objects
const saveWeeklyData = (weeklyData: WeekEntry[]): void => {
    localStorage.setItem("weeklyData", JSON.stringify(weeklyData));
}