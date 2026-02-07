// app/api/health/route.ts
import { NextRequest } from 'next/server';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export async function GET(request: NextRequest) {
  try {
    // Try to read a simple value from Firebase to verify connection
    // Using a test path - we expect this might not exist, so we handle the permission error gracefully
    const testRef = ref(db, 'health-check');
    const snapshot = await get(testRef);
    
    // If we reach this point, Firebase is accessible
    return Response.json({ 
      status: 'healthy', 
      firebase: 'accessible',
      hasData: snapshot.exists(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // If we get a permission error, it means we can connect to Firebase but don't have read access
    // This is still a healthy connection, just restricted by security rules
    if ((error as Error).message.includes('permission') || (error as Error).message.includes('Permission')) {
      return Response.json({ 
        status: 'healthy', 
        firebase: 'accessible-but-restricted-by-security-rules',
        timestamp: new Date().toISOString()
      });
    }
    
    console.error('Health check error:', error);
    return Response.json({ 
      status: 'unhealthy', 
      error: (error as Error).message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}