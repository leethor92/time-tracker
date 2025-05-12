import mongoose, { Schema } from 'mongoose';

const DayEntrySchema = new Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
  break: { type: Number, required: true },
  total: { type: Number, required: true },
});

const WeekEntrySchema = new Schema({
  weekStart: { type: String, required: true },
  hours: {
    Monday: { type: DayEntrySchema, required: true },
    Tuesday: { type: DayEntrySchema, required: true },
    Wednesday: { type: DayEntrySchema, required: true },
    Thursday: { type: DayEntrySchema, required: true },
    Friday: { type: DayEntrySchema, required: true },
    Saturday: { type: DayEntrySchema, required: true },
    Sunday: { type: DayEntrySchema, required: true },
  },
  hourlyRates: {
    Monday: { type: Number, required: true },
    Tuesday: { type: Number, required: true },
    Wednesday: { type: Number, required: true },
    Thursday: { type: Number, required: true },
    Friday: { type: Number, required: true },
    Saturday: { type: Number, required: true },
    Sunday: { type: Number, required: true },
  },
});

export const WeekEntry =
  mongoose.models.WeekEntry || mongoose.model('WeekEntry', WeekEntrySchema);
