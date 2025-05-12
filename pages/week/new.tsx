import React, { useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import { createEmptyWeek } from '../../models/WeekModel';
import HoursDashboard from '../../components/HoursDashboard';

export default function NewWeekPage() {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1); // Get this week's Monday
  const formattedMonday = monday.toISOString().split('T')[0];
  const router = useRouter()

  const emptyWeek = createEmptyWeek(formattedMonday);

  // Local state to hold the week data for saving
  const [weekData, setWeekData] = useState(emptyWeek);

  const handleSave = async (updatedWeekData: typeof weekData) => {
    setWeekData(updatedWeekData);
  
    try {
      const response = await axios.post('/api/weeks', updatedWeekData);
      console.log('Week created successfully:', response.data);
      router.push('/')
    } catch (error) {
      console.error('Error saving new week data:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Week</h1>
      <HoursDashboard weekData={weekData} onSave={handleSave} />
    </div>
  );
}
