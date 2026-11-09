"use client";
import Sidebar from "./Sidebar";
import { Bell, Search } from "lucide-react";

export default function AppShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return <div className="min-h-screen bg-ink text-slate-100">
    <Sidebar/>
    <div className="lg:pl-64">
      <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-line bg-ink/85 px-5 backdrop-blur-xl md:px-9">
        <div><p className="text-xs text-muted">Clinic workspace / <span className="text-cyan">{title}</span></p><h1 className="mt-1 text-lg font-semibold text-white">{title}</h1></div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-line bg-panel px-3 py-2 text-xs text-muted sm:flex"><Search size={15}/> Secure workspace</div>
          <button className="relative rounded-xl border border-line bg-panel p-2.5 text-slate-400"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan"/></button>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet text-sm font-bold text-ink">A</div>
        </div>
      </header>
      <main className="mx-auto max-w-[1500px] p-5 md:p-9">
        <div className="mb-7"><p className="text-sm text-muted">{subtitle}</p></div>
        {children}
      </main>
    </div>
  </div>;
}
