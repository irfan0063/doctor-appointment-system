'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { Doctor } from '@/types';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    api
      .get<Doctor[]>('/doctors')
      .then((res) => setDoctors(res.data))
      .catch(() => setDoctors([]));
  }, []);

  const filtered = useMemo(
    () =>
      doctors.filter(
        (doctor) =>
          doctor.specialty.toLowerCase().includes(specialty.toLowerCase()) &&
          (doctor.user.city ?? '').toLowerCase().includes(city.toLowerCase()),
      ),
    [city, doctors, specialty],
  );

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Find Doctors</h1>
      <div className="grid md:grid-cols-2 gap-3">
        <input
          className="border border-slate-300 rounded-lg p-2"
          placeholder="Search by specialty"
          value={specialty}
          onChange={(event) => setSpecialty(event.target.value)}
        />
        <input
          className="border border-slate-300 rounded-lg p-2"
          placeholder="Search by city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((doctor) => (
          <article key={doctor.id} className="border border-slate-200 rounded-xl p-4">
            <h2 className="font-semibold">Dr. {doctor.user.name}</h2>
            <p className="text-slate-600">{doctor.specialty}</p>
            <p className="text-sm text-slate-500">{doctor.user.city ?? 'City not specified'}</p>
            <p className="text-sm mt-2">
              Availability: {doctor.availableFrom ?? '--'} to {doctor.availableTo ?? '--'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
