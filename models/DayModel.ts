export interface DayEntry {
  start: string;  // "08:00" format or an ISO string if you prefer full datetime.
  end: string;    // Same as start.
  break: number;  // Break in minutes.
  total: number;  // Total worked hours (calculated or manually entered).
}