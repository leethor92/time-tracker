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
