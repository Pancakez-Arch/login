import { registerUser } from '../../../auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await registerUser(email, password);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
} 