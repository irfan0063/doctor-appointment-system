"use client";
import { useEffect, useState } from "react";
import { api, getErrorMessage, unwrapList } from "@/lib/api";
import { RefreshCw, Search } from "lucide-react";

type Config = { endpoint: string; title: string; fields: string[]; filters?: boolean; };
export default function SectionPage({ config }: { config: Config }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Lahore");
  const [specialty, setSpecialty] = useState("Cardiologist");
  const [query, setQuery] = useState("");

  async function load() {
    setLoading(true); setError("");
    try {
      const params = config.filters ? { city, specialty } : undefined;
      const { data } = await api.get(config.endpoint, { params });
      setRows(unwrapList(data));
    } catch (e) { setError(getErrorMessage(e)); setRows([]); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  const filtered = rows.filter(row => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-5">
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-line bg-panel p-5 md:flex-row md:items-center">
      <div><h2 className="text-lg font-semibold text-white">{config.title} directory</h2><p className="mt-1 text-sm text-muted">Records returned by your Clinic API.</p></div>
      <button onClick={load} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm text-slate-300 hover:border-cyan/40 hover:text-cyan"><RefreshCw size={15}/> Refresh</button>
    </div>
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-4 md:flex-row">
      {config.filters && <><input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" className="field md:max-w-48"/><input value={specialty} onChange={e=>setSpecialty(e.target.value)} placeholder="Specialty" className="field md:max-w-56"/></>}
      <div className="relative flex-1"><Search className="absolute left-3 top-3 text-muted" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${config.title.toLowerCase()}…`} className="field pl-10"/></div>
      {config.filters && <button onClick={load} className="rounded-xl bg-cyan px-5 py-2.5 text-sm font-semibold text-ink">Apply filters</button>}
    </div>
    {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"><b>API request failed:</b> {error}<p className="mt-1 text-xs text-red-200/70">Check that the backend is running, you are logged in, and CORS allows http://localhost:3001.</p></div>}
    <div className="overflow-hidden rounded-2xl border border-line bg-panel">
      {loading ? <div className="p-10 text-center text-sm text-muted">Loading records…</div> : filtered.length === 0 ? <div className="p-12 text-center"><p className="font-medium text-white">No records to display</p><p className="mt-1 text-sm text-muted">{error ? "Resolve the API error and refresh." : "No matching records were returned by the API."}</p></div> :
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-white/[.03] text-xs uppercase tracking-wider text-muted"><tr>{config.fields.map(f=><th key={f} className="px-5 py-4 font-semibold">{f}</th>)}</tr></thead><tbody className="divide-y divide-line">{filtered.map((row,i)=><tr key={row.id || i} className="hover:bg-white/[.02]">{config.fields.map(f=>{const key=f==="Name" ? "fullName" : f==="Fee" ? "consultationFeePkr" : f==="Phone" ? "phone" : f==="Specialty" ? "specialty" : f==="City" ? "city" : f==="CNIC" ? "cnic" : f==="Date" ? "appointmentDate" : f.toLowerCase(); const val=row[key] ?? row[f.toLowerCase()] ?? row.id ?? "—"; return <td key={f} className="max-w-[260px] truncate px-5 py-4 text-slate-300">{typeof val==="object" ? JSON.stringify(val) : String(val)}</td>;})}</tr>)}</tbody></table></div>}
    </div>
  </div>;
}
