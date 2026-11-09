'use client';

import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      setMessage(`Login success. Role: ${response.data.user.role}`);
    } catch {
      setMessage('Login failed.');
    }
  };

  return (
    <section className="max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded-lg p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border rounded-lg p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-600 text-white rounded-lg px-4 py-2">Sign in</button>
      </form>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </section>
  );
}
