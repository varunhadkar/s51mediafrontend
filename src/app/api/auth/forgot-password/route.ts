import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For testing, always return success
    return NextResponse.json({
      success: true,
      message: 'Password reset email sent',
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error',
    }, { status: 500 });
  }
}
