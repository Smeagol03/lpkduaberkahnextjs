// app/admin/layout.tsx
import Sidebar from '@/components/admin/Sidebar';
import AdminNavbar from '@/components/admin/AdminNavbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <AdminNavbar />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}