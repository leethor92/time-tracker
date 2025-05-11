import React, { useState } from 'react';
import { createEmptyWeek } from '../../models/WeekModel';
import HoursDashboard from '../../components/HoursDashboard';

export default function NewWeekPage() {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1); // Get this week's Monday
  const formattedMonday = monday.toISOString().split('T')[0];

  const emptyWeek = createEmptyWeek(formattedMonday);

  // Local state to hold the week data for saving
  const [weekData, setWeekData] = useState(emptyWeek);

  const handleSave = (updatedWeekData: typeof weekData) => {
    setWeekData(updatedWeekData);
    // Add logic to persist the data (e.g., API call, local storage, etc.)
    console.log('Week data saved', updatedWeekData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Week</h1>
      <HoursDashboard weekData={weekData} onSave={handleSave} />
    </div>
  );
}
