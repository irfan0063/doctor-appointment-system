import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'Doctor Appointment & Clinic Management System',
  description: 'Book appointments, manage clinics, doctors, patients, and payments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        <div className="min-h-screen p-4 md:p-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
            <Sidebar />
            <main className="flex-1 bg-white rounded-2xl p-6 shadow-sm">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
