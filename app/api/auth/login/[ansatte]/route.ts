import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'personal_trainer',

};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await mysql.createConnection(dbConfig);

    if (req.method === 'POST') {
      const { email, password } = req.body;

      const [rows]: any = await db.query(
        'SELECT fornavn, etternavn, epost, sertifisering FROM personlige_trenere WHERE epost = ?',
        [email]
      );

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // TODO: Add proper password handling with bcrypt
      if (rows.length > 0) {
        // Assuming password verification is successful
        // Call the login function from the context
        // You might need to use a state management solution to set the authentication state
        return res.status(200).json({ message: 'Login successful' });
      }
    } else {
      res.status(405).end(); // Method not allowed
    }
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
