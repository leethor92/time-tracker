import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import HoursDashboard from "../../components/HoursDashboard";
import { mockWeekData } from "../__mocks__/mockWeeks"

describe("HoursDashboard", () => {
  test("renders day rows and allows start time input change", () => {
    render(<HoursDashboard weekData={mockWeekData[0]} onSave={jest.fn()} />);

    const mondayRow = screen.getByTestId("row-Monday");
    const startInput = within(mondayRow).getByDisplayValue("09:00");

    fireEvent.change(startInput, { target: { value: "08:00" } });

    // Confirm the input change
    expect((startInput as HTMLInputElement).value).toBe("08:00");
  });

  test("updates total hours and net pay on break change", () => {
    render(<HoursDashboard weekData={mockWeekData[0]} onSave={jest.fn()} />);

    const mondayRow = screen.getByTestId("row-Monday");

    const breakInput = within(mondayRow).getByDisplayValue("30");
    fireEvent.change(breakInput, { target: { value: "60" } });

    // New total: 8 hours - 1 hour = 7.00 hours
    expect(within(mondayRow).getByText("7.00")).toBeInTheDocument();

    // Rate is $20, pay = 140, tax = 21.04, net = 118.96
    expect(within(mondayRow).getByText("$26.30")).toBeInTheDocument();
    expect(within(mondayRow).getByText("$148.70")).toBeInTheDocument();
  });

  test("save button triggers onSave with updated data", () => {
    const handleSave = jest.fn();
    render(<HoursDashboard weekData={mockWeekData[0]} onSave={handleSave} />);

    const tuesdayRow = screen.getByTestId("row-Tuesday");
    const rateInput = within(tuesdayRow).getByDisplayValue("25");
    fireEvent.change(rateInput, { target: { value: "30" } });

    fireEvent.click(screen.getByRole("button", { name: /save week/i }));

    expect(handleSave).toHaveBeenCalledTimes(1);
    const updatedData = handleSave.mock.calls[0][0];
    expect(updatedData.hourlyRates.Tuesday).toBe(30);
  });
});