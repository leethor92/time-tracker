import { calculateWeeklyNetPay } from './WeekModel';
import { DayEntry } from './DayModel';

describe('calculateWeeklyNetPay', () => {
  const mockHours: Record<string, DayEntry> = {
    Monday: { start: '09:00', end: '17:00', break: 0.5, total: 8 },
    Tuesday: { start: '09:00', end: '17:00', break: 0.5, total: 7 },
    Wednesday: { start: '09:00', end: '17:00', break: 0.5, total: 8 },
    Thursday: { start: '09:00', end: '17:00', break: 0.5, total: 7 },
    Friday: { start: '09:00', end: '17:00', break: 0.5, total: 8 },
    Saturday: { start: '', end: '', break: 0, total: 0 },
    Sunday: { start: '', end: '', break: 0, total: 0 },
  };

  const hourlyRates: Record<string, number> = {
    Monday: 30,
    Tuesday: 30,
    Wednesday: 30,
    Thursday: 30,
    Friday: 30,
    Saturday: 30,
    Sunday: 30,
  };

  it('calculates net pay correctly with 15.03% tax', () => {
    const grossPay =
      30 * (8 + 7 + 8 + 7 + 8); // total hours = 38, gross = 1140
    const expectedNetPay = grossPay * (1 - 0.1503); // tax = 15.03%

    const netPay = calculateWeeklyNetPay(mockHours, hourlyRates);
    expect(netPay).toBeCloseTo(expectedNetPay, 2);
  });

  it('returns 0 if all hours are 0', () => {
    const zeroHours = Object.fromEntries(
      Object.keys(mockHours).map(day => [day, { ...mockHours[day], total: 0 }])
    );

    const netPay = calculateWeeklyNetPay(zeroHours, hourlyRates);
    expect(netPay).toBe(0);
  });
});
