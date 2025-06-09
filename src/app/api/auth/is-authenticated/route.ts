import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  
  return NextResponse.json({ 
    isAuthenticated: !!token 
  });
}