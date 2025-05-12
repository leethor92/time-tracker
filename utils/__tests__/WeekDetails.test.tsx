import React from 'react';
import axios from "axios";
import { render, screen, waitFor, act } from '@testing-library/react';
import WeekDetails from '../../pages/week/[id]';
import { useRouter } from 'next/router';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('WeekDetails', () => {
  it('should display week details when a valid weekId is provided', async () => {
    // 1. Set up the mock router
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1' }, // ← must match the filename [id].tsx
    });

    // 2. Mock the API response from axios
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _id: "1",
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
      }
    });

    // 3. Render the component inside act
    await act(async () => {
      render(<WeekDetails />);
    });

    // 4. Wait for the data to appear
    await waitFor(() => {
      expect(screen.getByText(/Week Details: 2024-04-29/)).toBeInTheDocument();
    });
  });
});
