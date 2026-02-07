// app/debug-env/page.tsx
'use client';

export default function DebugEnvPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="space-y-2">
        <p><strong>ADMIN_EMAIL:</strong> {process.env.ADMIN_EMAIL}</p>
        <p><strong>ADMIN_PASSWORD:</strong> {process.env.ADMIN_PASSWORD ? 'SET (hidden)' : 'NOT SET'}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">All Environment Variables</h2>
        <pre>{JSON.stringify(process.env, null, 2)}</pre>
      </div>
    </div>
  );
}