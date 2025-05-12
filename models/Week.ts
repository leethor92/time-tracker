import mongoose, { Document, Schema } from 'mongoose';
import { WeekEntry } from './WeekModel';

// Define the Mongoose schema for a Week based on your WeekEntry interface
const WeekSchema = new Schema(
  {
    weekStart: { type: String, required: true },
    hours: {
      Monday: { type: Object, required: true },
      Tuesday: { type: Object, required: true },
      Wednesday: { type: Object, required: true },
      Thursday: { type: Object, required: true },
      Friday: { type: Object, required: true },
      Saturday: { type: Object, required: true },
      Sunday: { type: Object, required: true },
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
  },
  { timestamps: true }
);

// Create a Mongoose model for the Week
const Week = mongoose.models.Week || mongoose.model<WeekEntry & Document>('Week', WeekSchema);

export default Week;
