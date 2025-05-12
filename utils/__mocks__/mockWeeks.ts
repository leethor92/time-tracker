type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' ;

export interface WeekEntry {
  _id: string;
  weekStart: string;
  hours: Record<Day, { start: string; end: string; break: number; total: number }>;
  hourlyRates: Record<Day, number>;
}

export const mockWeekData: WeekEntry[] = [
  {
    _id: "123",
    weekStart: "2024-04-29",
    hours: {
      Monday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
      Tuesday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
      Wednesday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
      Thursday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
      Friday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
      Saturday: { start: "", end: "", break: 0, total: 0 },
      Sunday: { start: "", end: "", break: 0, total: 0 },
    },
    hourlyRates: {
      Monday: 25,
      Tuesday: 25,
      Wednesday: 25,
      Thursday: 25,
      Friday: 25,
      Saturday: 25,
      Sunday: 25,
    },
  },
  {
    _id: "456",
    weekStart: "2024-05-06",
    hours: {
        Monday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
        Tuesday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
        Wednesday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
        Thursday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
        Friday: { start: "09:00", end: "17:00", break: 30, total: 7.5 },
        Saturday: { start: "", end: "", break: 0, total: 0 },
        Sunday: { start: "", end: "", break: 0, total: 0 },
    },
    hourlyRates: {
        Monday: 25,
        Tuesday: 25,
        Wednesday: 25,
        Thursday: 25,
        Friday: 25,
        Saturday: 25,
        Sunday: 25,
    },
  },
];
