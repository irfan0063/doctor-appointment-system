'use client';

import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Doctor } from '@/types';

export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState({ doctorId: '', patientId: '', appointment: '', note: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api
      .get<Doctor[]>('/doctors')
      .then((res) => {
        setDoctors(res.data);
        if (res.data[0]) {
          setForm((prev) => ({ ...prev, doctorId: res.data[0].id }));
        }
      })
      .catch(() => setDoctors([]));
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await api.post('/appointments', form);
      setMessage('Appointment booked successfully');
      setForm((prev) => ({ ...prev, note: '', appointment: '' }));
    } catch {
      setMessage('Unable to book appointment. Ensure API is running and auth is configured.');
    }
  };

  return (
    <section className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Book Appointment</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border border-slate-300 rounded-lg p-2"
          placeholder="Patient profile ID"
          value={form.patientId}
          onChange={(event) => setForm((prev) => ({ ...prev, patientId: event.target.value }))}
          required
        />
        <select
          className="w-full border border-slate-300 rounded-lg p-2"
          value={form.doctorId}
          onChange={(event) => setForm((prev) => ({ ...prev, doctorId: event.target.value }))}
          required
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              Dr. {doctor.user.name} - {doctor.specialty}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          className="w-full border border-slate-300 rounded-lg p-2"
          value={form.appointment}
          onChange={(event) => setForm((prev) => ({ ...prev, appointment: event.target.value }))}
          required
        />
        <textarea
          className="w-full border border-slate-300 rounded-lg p-2"
          placeholder="Notes"
          value={form.note}
          onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
        />
        <button className="bg-blue-600 text-white rounded-lg px-4 py-2">Confirm Appointment</button>
      </form>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </section>
  );
}
