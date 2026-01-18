import { NextRequest, NextResponse } from 'next/server';

// Mock user data
const mockUser = {
  id: '1',
  email: 'admin@s51studios.com',
  name: 'Admin User',
  role: 'Admin',
};

// Mock credentials
const validCredentials = {
  email: 'admin@s51studios.com',
  password: 'admin123',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validate credentials
    if (email === validCredentials.email && password === validCredentials.password) {
      // Generate a mock token (in production, this would be a JWT)
      const mockToken = 'mock-jwt-token-' + Date.now();

      return NextResponse.json({
        success: true,
        token: mockToken,
        user: mockUser,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error',
    }, { status: 500 });
  }
}
