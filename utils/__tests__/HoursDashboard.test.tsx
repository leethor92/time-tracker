import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HoursDashboard from "../../components/HoursDashboard";
import { WeekEntry } from "../../models/WeekModel"; // Adjust imports based on your project structure

// Mock data for the weekData prop
const mockWeekData: WeekEntry = {
  weekStart: "2024-04-29",
  hours: {
    Monday: { start: "09:00", end: "17:00", break: 60, total: 7 },
    Tuesday: { start: "09:00", end: "17:00", break: 60, total: 7 },
    Wednesday: { start: "09:00", end: "17:00", break: 60, total: 7 },
    Thursday: { start: "09:00", end: "17:00", break: 60, total: 7 },
    Friday: { start: "09:00", end: "17:00", break: 60, total: 7 },
    Saturday: { start: "09:00", end: "17:00", break: 60, total: 7 },
    Sunday: { start: "09:00", end: "17:00", break: 60, total: 7 },
  },
  hourlyRates: {
    Monday: 30,
    Tuesday: 30,
    Wednesday: 30,
    Thursday: 30,
    Friday: 30,
    Saturday: 30,
    Sunday: 30,
  },
};

describe("HoursDashboard", () => {
    it("should render the HoursDashboard component with the correct data", () => {
      render(<HoursDashboard weekData={mockWeekData} />);
  
      // Check if the table rows for each day are rendered
      const mondayRow = screen.getByText(/Monday/i);
      expect(mondayRow).toBeInTheDocument();
  
      // Check if the weekly total is rendered
      const weeklyTotal = screen.getByText(/Weekly Total/i);
      expect(weeklyTotal).toBeInTheDocument();
    });
  
    it("should update the hours when the start time is changed", () => {
      render(<HoursDashboard weekData={mockWeekData} />);
  
      // Find the start time input for Monday
      const startTimeInput = screen.getByRole('row', { name: /Monday/i }).querySelector("input[type='time']");
      fireEvent.change(startTimeInput!, { target: { value: "08:00" } });
  
      // Verify that the total hours for Monday are recalculated (or check the total if necessary)
      const mondayTotal = screen.getByText(/Monday/i).closest('tr')?.querySelector("td:last-child");
      expect(mondayTotal?.textContent).not.toBe("7.00"); // Expect the total to change
    });
  
    it("should update the break time and recalculate the total hours", () => {
      render(<HoursDashboard weekData={mockWeekData} />);
  
      // Change break time for Monday
      const breakInput = screen.getByRole('row', { name: /Monday/i }).querySelector("input[type='number']");
      fireEvent.change(breakInput!, { target: { value: "90" } });
  
      // Verify the total is updated after changing the break time
      const mondayTotal = screen.getByText("6.50"); // Expect the total to be 6.5 hours after 90 min break
      expect(mondayTotal).toBeInTheDocument();
    });
  
    it("should calculate the weekly total correctly", () => {
      render(<HoursDashboard weekData={mockWeekData} />);
  
      // Verify the weekly total calculation is correct (should be 7 * 7 = 49 hours initially)
      const weeklyTotal = screen.getByText(/49.00/);
      expect(weeklyTotal).toBeInTheDocument();
    });
  
    it("should update the weekly total when changes are made", () => {
      render(<HoursDashboard weekData={mockWeekData} />);
  
      // Change break time for Monday
      const breakInput = screen.getByRole('row', { name: /Monday/i }).querySelector("input[type='number']");
      fireEvent.change(breakInput!, { target: { value: "90" } });
  
      // Check the weekly total, it should update after the change
      const updatedWeeklyTotal = screen.getByText(/48.50/); // Total should be reduced by the 0.5 hours from Monday
      expect(updatedWeeklyTotal).toBeInTheDocument();
    });
  });