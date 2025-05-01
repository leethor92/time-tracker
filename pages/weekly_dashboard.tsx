import Link from "next/link";

export default function WeeklyDashboard() {
  const weeklyData = [
    { id: 1, weekStart: "2024-04-29", hours: { Monday: { total: 8 }, Tuesday: { total: 7 }, Wednesday: { total: 8 }, Thursday: { total: 7 }, Friday: { total: 8 } } },
    { id: 2, weekStart: "2024-05-06", hours: { Monday: { total: 8 }, Tuesday: { total: 7 }, Wednesday: { total: 8 }, Thursday: { total: 7 }, Friday: { total: 8 } } },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Dashboard</h1>
      <button
        onClick={() => {}}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        ➕ Add New Week
      </button>
      <ul className="space-y-4">
        {weeklyData.map((week) => {
          const weeklyTotal = Object.values(week.hours).reduce(
            (sum, day) => sum + day.total,
            0
          );
          return (
            <li
              key={week.id}
              className="bg-white p-4 rounded shadow hover:bg-slate-100"
            >
              <Link href={`/week/${week.id}`}>
                <h2 className="text-lg font-semibold">
                  Week of {week.weekStart}
                </h2>
                <p>Total Hours: {weeklyTotal.toFixed(2)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
