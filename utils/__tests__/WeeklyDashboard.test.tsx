import React from "react";
import { render, screen, within } from "@testing-library/react";
import WeeklyDashboard from "../../pages/weekly_dashboard"; // Adjust the path if needed

describe("WeeklyDashboard", () => {
    it("should render the Weekly Dashboard with correct data", () => {
        render(<WeeklyDashboard />);
      
        // Verify if the "Weekly Dashboard" header is present
        const header = screen.getByText(/Weekly Dashboard/i);
        expect(header).toBeInTheDocument();
      
        // Verify if the weeks are displayed correctly
        const week1 = screen.getByText(/Week of\s*2024-04-29/i);
        const week2 = screen.getByText(/Week of\s*2024-05-06/i);
        expect(week1).toBeInTheDocument();
        expect(week2).toBeInTheDocument();
      
        // Ensure that closest() doesn't return null
        const week1Container = week1.closest("li");
        const week2Container = week2.closest("li");
      
        expect(week1Container).not.toBeNull();
        expect(week2Container).not.toBeNull();
      
        if (week1Container && week2Container) {
          // Use `within()` only if `closest()` returned valid elements
          const week1TotalHours = within(week1Container).getByText(/Total Hours: 38.00/i);
          const week2TotalHours = within(week2Container).getByText(/Total Hours: 38.00/i);
      
          expect(week1TotalHours).toBeInTheDocument();
          expect(week2TotalHours).toBeInTheDocument();
        }
    })

  it("should have a button to add a new week", () => {
    render(<WeeklyDashboard />);

    // Check if the "Add New Week" button is rendered
    const addButton = screen.getByText(/➕ Add New Week/i);
    expect(addButton).toBeInTheDocument();
  });

  it("should calculate total hours correctly for each week", async () => {
    render(<WeeklyDashboard />);
  
    // Verify the week containers
    const week1 = screen.getByText(/Week of\s*2024-04-29/i);
    const week2 = screen.getByText(/Week of\s*2024-05-06/i);
  
    // Ensure the week containers exist
    expect(week1).toBeInTheDocument();
    expect(week2).toBeInTheDocument();
  
    // Ensure that week1Container and week2Container are not null
    const week1Container = week1.closest('li');
    const week2Container = week2.closest('li');
  
    // Check if the li elements exist before proceeding
    expect(week1Container).not.toBeNull();
    expect(week2Container).not.toBeNull();
  
    // Verify the total hours for week 1
    const totalHours1 = within(week1Container!).getByText(/Total Hours: 38.00/i);
  
    // Verify the total hours for week 2
    const totalHours2 = within(week2Container!).getByText(/Total Hours: 38.00/i);
  
    // Assertions
    expect(totalHours1).toBeInTheDocument();
    expect(totalHours2).toBeInTheDocument();
  });
});
