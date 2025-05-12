// pages/api/weeks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongoose';
import { WeekEntry } from '../../models/WeekEntry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const newWeek = await WeekEntry.create(req.body);
      res.status(201).json(newWeek);
    } catch (err) {
      res.status(400).json({ error: 'Failed to save week data' });
    }
  } else if (req.method === 'GET') {
    const weeks = await WeekEntry.find().sort({ weekStart: -1 });
    res.status(200).json(weeks);
  } else {
    res.status(405).end();
  }
}
