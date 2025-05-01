import { DayEntry } from './DayModel';

export interface WeekEntry {
  weekStart: string; // Week start date in "YYYY-MM-DD" format
  hours: Record<string, DayEntry>; // Keyed by day of the week
}

// Calculates the total weekly hours
export function calculateWeeklyTotal(hours: Record<string, DayEntry>): number {
  return Object.values(hours).reduce((total, day) => total + day.total, 0);
}

// Generates an empty week entry with default values for each day
export function createEmptyWeek(weekStart: string): WeekEntry {
  const defaultDay: DayEntry = {
    start: '',
    end: '',
    break: 0,
    total: 0,
  };

  const hours: Record<string, DayEntry> = {
    Monday: { ...defaultDay },
    Tuesday: { ...defaultDay },
    Wednesday: { ...defaultDay },
    Thursday: { ...defaultDay },
    Friday: { ...defaultDay },
    Saturday: { ...defaultDay },
    Sunday: { ...defaultDay },
  };

  return { weekStart, hours };
}
