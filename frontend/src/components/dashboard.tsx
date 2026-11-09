'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DashboardProps = {
  title: string;
  summary: Array<{ label: string; value: string }>;
};

const chartData = [
  { name: 'Mon', appointments: 5 },
  { name: 'Tue', appointments: 8 },
  { name: 'Wed', appointments: 6 },
  { name: 'Thu', appointments: 9 },
  { name: 'Fri', appointments: 7 },
];

export function Dashboard({ title, summary }: DashboardProps) {
  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item) => (
          <article key={item.label} className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="text-2xl font-semibold">{item.value}</p>
          </article>
        ))}
      </div>
      <div className="h-72 border border-slate-200 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="appointments" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
