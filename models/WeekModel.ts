import { DayEntry } from './DayModel';

export interface WeekEntry {
  weekStart: string; // Week start date in "YYYY-MM-DD" format
  hours: Record<string, DayEntry>; // Keyed by day of the week
  hourlyRates: Record<string, number>; // Keyed by day of the week with hourly rates
}

// Calculates the total weekly hours
export function calculateWeeklyTotal(hours: Record<string, DayEntry>): number {
  return Object.values(hours).reduce((total, day) => total + day.total, 0);
}

// Calculates the weekly total pay (net pay after tax)
export function calculateWeeklyNetPay(
  hours: Record<string, DayEntry>,
  hourlyRates: Record<string, number>
): number {
  const TAX_RATE = 0.1503; // 15% tax rate

  return Object.keys(hours).reduce((totalNetPay, day) => {
    const rate = hourlyRates[day];
    const totalHours = hours[day].total;
    const dailyPay = rate * totalHours;
    const tax = dailyPay * TAX_RATE;
    const netPay = dailyPay - tax;
    return totalNetPay + netPay;
  }, 0);
}

const defaultRate = 29.33

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

  const hourlyRates: Record<string, number> = {
    Monday: defaultRate,
    Tuesday: defaultRate,
    Wednesday: defaultRate,
    Thursday: defaultRate,
    Friday: defaultRate,
    Saturday: defaultRate,
    Sunday: defaultRate,
  };

  return { weekStart, hours, hourlyRates };
}
