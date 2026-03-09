import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { uid, email, displayName, timestamp } = await request.json();

    if (!uid || !email || !timestamp) {
      return NextResponse.json(
        { error: 'Invalid session data' },
        { status: 400 }
      );
    }

    const sessionData = {
      uid,
      email,
      displayName: displayName || email,
      timestamp
    };

    const response = NextResponse.json({ success: true });

    // Set HTTP-only cookie
    response.cookies.set('adminSession', encodeURIComponent(JSON.stringify(sessionData)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('adminSession');
  return response;
}
