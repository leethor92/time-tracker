# HoursDashboard

A React-based weekly hours dashboard built with **Next.js** and **TypeScript**, allowing users to input and update their work hours, break durations, and view real-time calculations of total hours, gross pay, tax, and net pay. Data is stored in **MongoDB** via **Mongoose**. The app is fully tested using **React Testing Library** and **Jest**.

---

## 🚀 Features

- 🗓 Displays work hours for a full week (Monday–Sunday)
- ✏️ Editable start time, end time, and break duration
- 📊 Automatically calculates:
  - Total hours (adjusted for breaks)
  - Gross pay (based on hourly rate per day)
  - Estimated tax (~15%)
  - Net pay (after tax)
- 💾 MongoDB backend with Mongoose for persistence
- ✅ Unit tested with React Testing Library

---

## 📦 Tech Stack

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)

---

## 💵 Pay Calculation Logic

- **Total Hours** = `(end - start - break) / 60`
- **Gross Pay** = `total hours × hourly rate`
- **Tax** = `~15% of gross pay`
- **Net Pay** = `gross pay - tax`

Values are recalculated dynamically whenever the user modifies the break duration or time fields.

---

## 🧪 Running Tests

```bash
npm install
npm test
```

## ✅ Example Test Case

``` js
test("updates total hours and net pay on break change", () => {
    render(<HoursDashboard weekData={mockWeekData[0]} onSave={jest.fn()} />);
    const mondayRow = screen.getByTestId("row-Monday");
    const breakInput = within(mondayRow).getByDisplayValue("30");
    fireEvent.change(breakInput, { target: { value: "60" } });
    expect(within(mondayRow).getByText("7.00")).toBeInTheDocument(); // Total hours
    expect(within(mondayRow).getByText("$21.04")).toBeInTheDocument(); // Tax
    expect(within(mondayRow).getByText("$118.96")).toBeInTheDocument(); // Net
  })'
```

## 🧑‍💻 Development

Environment Setup:
You must define a .env file with the following:
```ini
MONGODB_URI=mongodb+srv://<your-connection-string>
```

## 🛠 Getting Started

# Clone the repo
```bash
git clone https://github.com/leethor92/time-tracker.git
cd time-tracker
```

# Install dependencies
```bash
npm install
```

# Run the development server
```bash
npm run dev
```

## 🔧 TODOs
 Add error handling for invalid time inputs

 Display cumulative weekly totals

 Support custom tax logic or tax brackets

 CRUD functionality for weekly records

 Add user-specific data and authentication