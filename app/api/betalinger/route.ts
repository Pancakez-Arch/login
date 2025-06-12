import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'personal_trainer',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await mysql.createConnection(dbConfig);

    if (req.method === 'POST') {
      const { medlemId, belop, betalingsDato, betalingsMetode, status } = req.body;


      // Log the incoming request data for debugging
      console.log('Incoming payment data:', req.body);

      // Insert payment data into the database
      const [result]: any = await db.query(
        'INSERT INTO betalinger (belop, betalings_dato, betalings_metode, status) VALUES (?, ?, ?, ?)',
      );



      return res.status(201).json({ id: result.insertId, message: 'Payment processed successfully!' });
    } else {
      res.status(405).json({ error: 'Method not allowed' }); // Return JSON error
    }
  } catch (error) {
    console.error('Database error:', error); // Log the error details
    return res.status(500).json({ error: 'Database connection failed', details: (error as Error).message }); // Ensure JSON response with error details
  }
} 