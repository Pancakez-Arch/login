import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'personal_trainer',
  });

  const [rows] = await connection.query('SELECT * FROM personlige_trenere');
  await connection.end();

  return NextResponse.json(rows);
}