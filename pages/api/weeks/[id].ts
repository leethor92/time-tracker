import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongoose'; // Import the connection utility
import Week from '../../../models/Week'; // Import the Mongoose model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Ensure the DB connection is established before any request is processed
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const week = await Week.findById(id);  // Use Mongoose to fetch the week by its ID
      if (!week) {
        return res.status(404).json({ message: 'Week not found' });
      }
      return res.status(200).json(week);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching week data', error });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedWeek = await Week.findByIdAndUpdate(id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is applied
      });

      if (!updatedWeek) {
        return res.status(404).json({ message: 'Week not found' });
      }

      return res.status(200).json(updatedWeek);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating week data', error });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}
