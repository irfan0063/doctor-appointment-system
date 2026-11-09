"use client";

import { Activity } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function RevenueChart({ data }: { data: Array<Record<string, unknown>> }) {
  if (!data.length) {
    return <div className="mt-6 grid h-64 place-items-center rounded-xl border border-dashed border-line text-center"><div><Activity className="mx-auto mb-2 text-muted" size={25}/><p className="text-sm text-slate-300">Revenue chart will appear here</p><p className="mt-1 text-xs text-muted">Your API should return monthlyRevenue data.</p></div></div>;
  }

  return <div className="mt-6 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid stroke="#24314a" vertical={false}/><XAxis dataKey="month" stroke="#8b9ab5" fontSize={12}/><YAxis stroke="#8b9ab5" fontSize={12}/><Tooltip contentStyle={{background:"#111a2e",border:"1px solid #24314a",borderRadius:12}}/><Bar dataKey="revenue" fill="#38bdf8" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>;
}
