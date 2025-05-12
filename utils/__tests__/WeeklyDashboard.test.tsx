import React from "react";
import axios from "axios";
import { render, screen, within, act, waitFor } from "@testing-library/react";
import WeeklyDashboard from "../../pages/weekly_dashboard"; // Adjust the path if needed
import { mockWeekData } from "../__mocks__/mockWeeks"

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WeeklyDashboard", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockWeekData });
  });

  it("should render the Weekly Dashboard with correct data", async () => {
    // Wrap the render call in act to handle state updates correctly
    await act(async () => {
      render(<WeeklyDashboard />);
    });
    
    // Wait for the weeks to be displayed correctly
    const week1 = await screen.findByText(/Week of\s*2024-04-29/i);
    const week2 = await screen.findByText(/Week of\s*2024-05-06/i);
  
    // Verify if the week elements are in the document
    expect(week1).toBeInTheDocument();
    expect(week2).toBeInTheDocument();
  });

  it("should have a button to add a new week", async () => {
    await act(async () => {
      render(<WeeklyDashboard />);
    });

    // Check if the "Add New Week" button is rendered
    const addButton = screen.getByText(/➕ Add New Week/i);
    expect(addButton).toBeInTheDocument();
  });

  it("should calculate total hours correctly for each week", async () => {
    await act(async () => {
      render(<WeeklyDashboard />);
    });
  
    // Wait for the week containers to render
    const week1 = await screen.findByText(/Week of\s*2024-04-29/i);
    const week2 = await screen.findByText(/Week of\s*2024-05-06/i);
  
    // Ensure the week containers exist
    expect(week1).toBeInTheDocument();
    expect(week2).toBeInTheDocument();
  
    // Find the list items (weeks)
    const week1Container = week1.closest("li");
    const week2Container = week2.closest("li");
  
    // Ensure that the week containers are not null
    expect(week1Container).not.toBeNull();
    expect(week2Container).not.toBeNull();
  
    // Verify the total hours for week 1
    const totalHours1 = within(week1Container!).getByText(/Total Hours: 37.50/i);
    const totalHours2 = within(week2Container!).getByText(/Total Hours: 37.50/i);
  
    // Assertions
    expect(totalHours1).toBeInTheDocument();
    expect(totalHours2).toBeInTheDocument();
  });
});
