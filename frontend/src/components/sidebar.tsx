'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Stethoscope, Users, Shield, CreditCard } from 'lucide-react';

const links = [
  { href: '/dashboard/admin', label: 'Admin', icon: Shield },
  { href: '/dashboard/doctor', label: 'Doctor', icon: Stethoscope },
  { href: '/dashboard/patient', label: 'Patient', icon: Users },
  { href: '/doctors', label: 'Doctors', icon: Stethoscope },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/auth/login', label: 'Login', icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-white p-4 rounded-2xl">
      <h2 className="text-xl font-semibold mb-6">Clinic Panel</h2>
      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
              pathname === href ? 'bg-blue-600' : 'hover:bg-slate-800'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
