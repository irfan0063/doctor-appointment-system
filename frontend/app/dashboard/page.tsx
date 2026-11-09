"use client";
import { useEffect, useState } from "react";
import { Activity, CalendarCheck, CircleDollarSign, Stethoscope, Users, ArrowUpRight, RefreshCw } from "lucide-react";
import AppShell from "@/components/AppShell";
import RevenueChart from "@/components/RevenueChart";
import StatCard from "@/components/StatCard";
import { api, getErrorMessage } from "@/lib/api";

export default function DashboardPage() {
  const [data,setData] = useState<any>({});
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);
  async function load(){setLoading(true);setError("");try{const res=await api.get("/dashboard");setData(res.data?.data ?? res.data ?? {});}catch(e){setError(getErrorMessage(e));}finally{setLoading(false);}}
  useEffect(()=>{load();},[]);
  const stats = [
    {label:"Total doctors",value:data.totalDoctors ?? data.doctorsCount ?? data.doctors?.length ?? "—",note:"Registered medical staff",icon:Stethoscope},
    {label:"Total patients",value:data.totalPatients ?? data.patientsCount ?? data.patients?.length ?? "—",note:"Patient records",icon:Users,tint:"violet"},
    {label:"Appointments",value:data.totalAppointments ?? data.appointmentsCount ?? data.appointments?.length ?? "—",note:"Appointments in system",icon:CalendarCheck,tint:"green"},
    {label:"Total revenue",value:data.totalRevenuePkr != null ? `PKR ${Number(data.totalRevenuePkr).toLocaleString()}` : data.revenue != null ? `PKR ${Number(data.revenue).toLocaleString()}` : "—",note:"Recorded payments",icon:CircleDollarSign,tint:"amber"}
  ];
  const chartData = Array.isArray(data.monthlyRevenue) ? data.monthlyRevenue : Array.isArray(data.revenueByMonth) ? data.revenueByMonth : [];
  return <AppShell title="Overview" subtitle="A quick look at your clinic's activity and performance.">
    <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-semibold text-white">Dashboard overview</h2><p className="mt-1 text-sm text-muted">Live data from your backend API</p></div><button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm text-slate-300 hover:text-cyan"><RefreshCw size={15}/> Refresh</button></div>
    {error && <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">Dashboard API: {error}</div>}
    {loading && <p className="mb-4 text-sm text-muted">Loading dashboard data…</p>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(s=><StatCard key={s.label} {...s}/>)}</div>
    <div className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
      <section className="rounded-2xl border border-line bg-panel p-5"><div className="flex items-center justify-between"><div><h3 className="font-semibold text-white">Revenue analytics</h3><p className="mt-1 text-xs text-muted">Monthly revenue from API response</p></div><span className="rounded-lg bg-cyan/10 p-2 text-cyan"><Activity size={18}/></span></div>
        <RevenueChart data={chartData}/>
      </section>
      <section className="rounded-2xl border border-line bg-panel p-5"><h3 className="font-semibold text-white">Quick actions</h3><p className="mt-1 text-xs text-muted">Jump to a clinic workspace section.</p><div className="mt-5 space-y-3">{[{name:"Manage doctors",href:"/doctors"},{name:"View patients",href:"/patients"},{name:"Appointments",href:"/appointments"},{name:"Payments",href:"/payments"}].map(x=><a key={x.href} href={x.href} className="flex items-center justify-between rounded-xl border border-line bg-ink/50 px-4 py-3 text-sm text-slate-300 hover:border-cyan/40 hover:text-cyan">{x.name}<ArrowUpRight size={16}/></a>)}</div><div className="mt-5 rounded-xl bg-cyan/5 p-4"><p className="text-xs leading-5 text-muted">Keep your patient information private. Use authorized accounts and secure access only.</p></div></section>
    </div>
  </AppShell>;
}
