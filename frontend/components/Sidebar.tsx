"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, CalendarDays, CreditCard, FileText, LayoutDashboard, LogOut, Stethoscope, Users } from "lucide-react";
import { logout } from "@/lib/api";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/prescriptions", label: "Prescriptions", icon: FileText },
  { href: "/payments", label: "Payments", icon: CreditCard }
];

export default function Sidebar() {
  const path = usePathname();
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-panel/95 px-5 py-6 lg:flex">
    <Link href="/dashboard" className="mb-10 flex items-center gap-3 px-2">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet text-ink"><Activity size={22}/></span>
      <span><b className="block text-lg tracking-wide text-white">CLINIC<span className="text-cyan">+</span></b><small className="text-xs text-muted">Management System</small></span>
    </Link>
    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Workspace</p>
    <nav className="flex-1 space-y-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = path === href;
        return <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? "bg-cyan/10 font-semibold text-cyan ring-1 ring-cyan/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
          <Icon size={18}/>{label}
        </Link>;
      })}
    </nav>
    <div className="rounded-2xl border border-line bg-ink/60 p-4">
      <p className="text-sm font-semibold text-white">Clinic workspace</p>
      <p className="mt-1 text-xs leading-5 text-muted">Manage daily operations from one place.</p>
    </div>
    <button onClick={logout} className="mt-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-300"><LogOut size={18}/> Sign out</button>
  </aside>;
}
