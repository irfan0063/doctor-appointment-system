import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Doctor Appointment & Clinic Management System</h1>
      <p className="text-slate-600">
        A modern healthcare platform for appointment scheduling, doctor availability,
        prescriptions, and payment management.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Browse Doctors', href: '/doctors' },
          { title: 'Book Appointment', href: '/appointments' },
          { title: 'Admin Dashboard', href: '/dashboard/admin' },
          { title: 'Doctor Dashboard', href: '/dashboard/doctor' },
          { title: 'Patient Dashboard', href: '/dashboard/patient' },
          { title: 'Login / Register', href: '/auth/login' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-slate-200 p-4 hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <h2 className="font-semibold">{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
