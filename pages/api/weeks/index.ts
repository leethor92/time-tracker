import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongoose'; // MongoDB connection utility
import Week from '../../../models/Week'; // Your Mongoose Week model

// API handler for GET and POST requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase(); // Ensure DB connection is established

  if (req.method === 'GET') {
    try {
      // Fetch all weeks from the database
      const weeks = await Week.find();
      return res.status(200).json(weeks); // Send the list of weeks
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching weeks data' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newWeek = await Week.create(req.body); // Create a new week in the database
      return res.status(201).json(newWeek); // Send the created week data
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating week data' });
    }
  }

  return res.status(405).end(); // Method Not Allowed for other HTTP methods
}
