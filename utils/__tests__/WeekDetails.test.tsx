// WeekDetails.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WeekDetails from '../../pages/week/[weekId]';
import { useRouter } from 'next/router';

// Mock the Next.js `useRouter` hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('WeekDetails', () => {

  it('should display week details when a valid weekId is provided', async () => {
    // Mock the router to simulate a valid `weekId`
    (useRouter as jest.Mock).mockReturnValue({
      query: { weekId: '1' },
    });

    render(<WeekDetails />);
    
    // Wait for the component to finish loading the week data
    await waitFor(() => screen.getByText(/Week Details: 2024-04-29/));

    // Check that the correct week is displayed
    expect(screen.getByText(/Week Details: 2024-04-29/)).toBeInTheDocument();
  });
});
