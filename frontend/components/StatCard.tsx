import type { LucideIcon } from "lucide-react";
export default function StatCard({ label, value, note, icon: Icon, tint = "cyan" }: { label: string; value: string | number; note: string; icon: LucideIcon; tint?: string }) {
  return <div className="rounded-2xl border border-line bg-panel p-5 shadow-glow">
    <div className="flex items-start justify-between"><p className="text-sm text-muted">{label}</p><span className={`rounded-xl p-2.5 ${tint === "violet" ? "bg-violet/10 text-violet-300" : tint === "green" ? "bg-emerald-400/10 text-emerald-300" : tint === "amber" ? "bg-amber-400/10 text-amber-300" : "bg-cyan/10 text-cyan"}`}><Icon size={19}/></span></div>
    <p className="mt-5 text-3xl font-bold tracking-tight text-white">{value}</p><p className="mt-1 text-xs text-muted">{note}</p>
  </div>;
}
