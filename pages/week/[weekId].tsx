import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HoursDashboard from '../../components/HoursDashboard';

export default function WeekDetails() {
  const router = useRouter();
  const { weekId } = router.query;

  // State to store the resolved weekId and the weekData
  const [resolvedWeekId, setResolvedWeekId] = useState<string | undefined>(undefined);

  // State to manage loading and data fetching
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if the query has been populated and is a valid string
    if (weekId && typeof weekId === 'string') {
      setResolvedWeekId(weekId); // Set the resolved weekId
      setLoading(false); // Mark loading as complete
    }
  }, [weekId]); // This will run again whenever `weekId` changes

  if (loading) {
    return <p>Loading...</p>;
  }

  // Sample weekly data
  const weeklyData = [
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
        Sunday: { start: "", end: "", break: 0, total: 0 }
      }
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
        Sunday: { start: "", end: "", break: 0, total: 0 }
      }
    },
  ];

  // Find the week data by id (or other unique identifier)
  const weekData = weeklyData.find((week) => week.id === resolvedWeekId);

  if (!weekData) return <p>Week not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Week Details: {weekData.weekStart}</h1>
      <HoursDashboard weekData={weekData} />
    </div>
  );
}
