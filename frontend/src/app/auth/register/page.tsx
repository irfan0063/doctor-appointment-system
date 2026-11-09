'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'PATIENT', city: '' });
  const [message, setMessage] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api.post('/auth/register', form);
      setMessage('Registration complete. You can now sign in.');
    } catch {
      setMessage('Registration failed.');
    }
  };

  return (
    <section className="max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded-lg p-2" placeholder="Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
        <input className="w-full border rounded-lg p-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} required />
        <input className="w-full border rounded-lg p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} required />
        <select className="w-full border rounded-lg p-2" value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}>
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>
        <input className="w-full border rounded-lg p-2" placeholder="City" value={form.city} onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))} />
        <button className="bg-blue-600 text-white rounded-lg px-4 py-2">Create account</button>
      </form>
      <p className="text-sm">
        Already have an account? <Link className="text-blue-600" href="/auth/login">Login</Link>
      </p>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </section>
  );
}
