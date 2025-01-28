import { setupDatabase } from '../auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await setupDatabase();
  return NextResponse.json(result);
} 