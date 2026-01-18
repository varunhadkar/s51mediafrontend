import { NextRequest, NextResponse } from 'next/server';

// Mock user data
const mockUser = {
  id: '1',
  email: 'admin@s51studios.com',
  name: 'Admin User',
  role: 'Admin',
};

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: 'No token provided',
      }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // In a real app, you'd verify the JWT token here
    // For testing, just check if token exists and starts with 'mock-jwt-token'
    if (token && token.startsWith('mock-jwt-token')) {
      return NextResponse.json(mockUser, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid token',
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error',
    }, { status: 500 });
  }
}
