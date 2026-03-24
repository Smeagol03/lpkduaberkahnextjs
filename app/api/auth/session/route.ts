import { NextResponse } from 'next/server';

const SESSION_DURATION = 2 * 60 * 60; // 2 hours in seconds
const REMEMBER_ME_DURATION = 30 * 24 * 60 * 60; // 30 days in seconds

export async function POST(request: Request) {
  try {
    const { uid, email, displayName, sessionId, expiresAt, rememberMe, timestamp } = await request.json();

    if (!uid || !email || !sessionId || !timestamp) {
      return NextResponse.json(
        { error: 'Invalid session data' },
        { status: 400 }
      );
    }

    const sessionData = {
      uid,
      email,
      displayName: displayName || email,
      sessionId,
      expiresAt,
      rememberMe: rememberMe || false,
      timestamp
    };

    const response = NextResponse.json({ success: true });

    // Set HTTP-only cookie with appropriate duration
    const maxAge = rememberMe ? REMEMBER_ME_DURATION : SESSION_DURATION;
    
    response.cookies.set('adminSession', encodeURIComponent(JSON.stringify(sessionData)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: maxAge,
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

export async function GET(request: Request) {
  // Get session from cookie
  const sessionCookie = request.headers.get('cookie')?.match(/adminSession=([^;]+)/)?.[1];
  
  if (!sessionCookie) {
    return NextResponse.json({ valid: false, error: 'No session found' });
  }

  try {
    const sessionData = JSON.parse(decodeURIComponent(sessionCookie));
    const now = Date.now();

    // Check if session is expired
    if (sessionData.expiresAt && now > sessionData.expiresAt) {
      const response = NextResponse.json({ valid: false, error: 'Session expired' });
      response.cookies.delete('adminSession');
      return response;
    }

    return NextResponse.json({ valid: true, session: sessionData });
  } catch (error) {
    console.error('Session validation error:', error);
    const response = NextResponse.json({ valid: false, error: 'Invalid session' });
    response.cookies.delete('adminSession');
    return response;
  }
}
