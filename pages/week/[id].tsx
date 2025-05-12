import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import HoursDashboard from "../../components/HoursDashboard";
import { WeekEntry } from "../../models/WeekModel";

export default function WeekDetails() {
  const router = useRouter();
  const { id } = router.query; // Extract the ID from the URL

  const [weekData, setWeekData] = useState<WeekEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Wait until the ID is available
    const fetchWeekData = async () => {
      try {
        const res = await axios.get(`/api/weeks/${id}`);
        setWeekData(res.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError("Error fetching week data");
        setLoading(false);
      }
    };
    fetchWeekData();
  }, [id]);

  const handleSave = async (updatedWeekData: WeekEntry) => {
    try {
      // Update state first to reflect immediate changes
      setWeekData(updatedWeekData);
      
      // Send PUT request to update the week data on the server
      const response = await axios.put(`/api/weeks/${id}`, updatedWeekData);
      router.push('/')
      console.log('Week updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating week data:', error);
      setError('Error updating week data');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>; // Display error message if there is an error

  if (!weekData) return <p>Week not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Week Details: {weekData.weekStart}</h1>
      <HoursDashboard weekData={weekData} onSave={handleSave} />
    </div>
  );
}
