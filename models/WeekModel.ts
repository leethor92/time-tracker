import { DayEntry } from './DayModel';
import { daysOfWeek } from '../utils/constants'

export interface WeekEntry {
  weekStart: string; // Week start date in "YYYY-MM-DD" format
  hours: Record<string, DayEntry>; // Keyed by day of the week
}

export function calculateWeeklyTotal(hours: Record<string, DayEntry>): number {
  return Object.values(hours).reduce((total, day) => total + day.total, 0);
}

export function createEmptyWeek(weekStart: string): WeekEntry {
  const defaultDay: DayEntry = {
    start: '',
    end: '',
    break: 0,
    total: 0
  };

  const hours = Object.fromEntries(
    daysOfWeek.map(day => [day, { ...defaultDay }])
  );

  return { weekStart, hours };
}
