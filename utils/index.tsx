import { WeeklyEntry } from "../models/WeekModel";

// Function to format date to "YYYY-MM-DD"
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to calculate total hours for a week
export function calculateTotalHoursForWeek(week: WeeklyEntry): number {
  return Object.values(week.hours).reduce((total, day) => total + day.total, 0);
}

export const calculateHours = (start: string, end: string, breakMinutes: number): number => {
  if (!start || !end) return 0;

  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;

  // Handle the case where the end time is earlier than the start time (over midnight)
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // Add 24 hours in minutes to handle crossing midnight
  }

  // Calculate the difference, subtract the break time
  const diff = endMinutes - startMinutes - breakMinutes;

  // If the break time is greater than or equal to the total minutes, return 0
  if (diff <= 0) return 0;

  // Return the difference in hours, rounded to two decimal places
  return parseFloat((diff / 60).toFixed(2));
};
