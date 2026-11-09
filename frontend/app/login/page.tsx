"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, LockKeyhole, Mail } from "lucide-react";
import { getErrorMessage, login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email,setEmail] = useState("admin@clinic.pk");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try { await login(email,password); router.replace("/dashboard"); }
    catch(err) { setError(getErrorMessage(err)); }
    finally { setBusy(false); }
  }
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-5 py-10">
    <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet/10 blur-3xl"/><div className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-3xl"/>
    <div className="relative w-full max-w-md rounded-3xl border border-line bg-panel/90 p-8 shadow-glow backdrop-blur">
      <div className="mb-8 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-violet text-ink"><Activity size={25}/></span><div><h1 className="text-xl font-bold text-white">CLINIC<span className="text-cyan">+</span></h1><p className="text-xs text-muted">Management workspace</p></div></div>
      <h2 className="text-2xl font-bold text-white">Welcome back</h2><p className="mt-2 text-sm text-muted">Sign in to manage your clinic operations.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="block text-sm text-slate-300">Email<div className="relative mt-2"><Mail className="absolute left-3 top-3 text-muted" size={17}/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="field pl-10"/></div></label>
        <label className="block text-sm text-slate-300">Password<div className="relative mt-2"><LockKeyhole className="absolute left-3 top-3 text-muted" size={17}/><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="field pl-10"/></div></label>
        {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-gradient-to-r from-cyan to-sky-400 py-3 font-bold text-ink transition hover:brightness-110 disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
      </form>
      <p className="mt-6 text-center text-xs text-muted">Secure access to your clinic dashboard</p>
    </div>
  </main>;
}
