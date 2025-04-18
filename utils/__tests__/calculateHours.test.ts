import { calculateHours } from "../../utils/index";

describe("calculateHours", () => {
  it("should return correct hours with break time", () => {
    expect(calculateHours("09:00", "17:00", 60)).toBe(7);
    expect(calculateHours("08:30", "12:00", 30)).toBe(3);
  });

  it("should return correct fractional hours", () => {
    expect(calculateHours("10:00", "11:30", 0)).toBe(1.5);
    expect(calculateHours("10:00", "11:30", 30)).toBe(1);
  });

  it("should return 0 for missing times", () => {
    expect(calculateHours("", "17:00", 60)).toBe(0);
    expect(calculateHours("09:00", "", 60)).toBe(0);
  });

  it("should return 0 for break time greater than total time", () => {
    expect(calculateHours("09:00", "09:30", 60)).toBe(0);
  });

  it("should return exact hour calculation", () => {
    expect(calculateHours("09:00", "17:00", 0)).toBe(8);
  });

  it("should handle time range over midnight", () => {
    expect(calculateHours("23:30", "01:00", 0)).toBe(1.5);
  });
});
