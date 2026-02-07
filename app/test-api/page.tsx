// app/test-api/page.tsx
'use client';

import { useState } from 'react';

export default function TestApiPage() {
  const [response, setResponse] = useState<string | null>(null);

  const testLogin = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'supersecretpassword'
        })
      });
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    }
  };

  const testAuthCheck = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test API Auth</h1>
      <div className="space-y-4">
        <button 
          onClick={testLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Login
        </button>
        <button 
          onClick={testAuthCheck}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Auth Check
        </button>
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Response:</h3>
            <pre>{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}