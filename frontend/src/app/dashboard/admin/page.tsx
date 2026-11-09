import { Dashboard } from '@/components/dashboard';

export default function AdminDashboardPage() {
  return (
    <Dashboard
      title="Admin Dashboard"
      summary={[
        { label: 'Total Doctors', value: '24' },
        { label: 'Total Patients', value: '310' },
        { label: 'Today Appointments', value: '19' },
        { label: 'Payments Collected', value: '$12,400' },
      ]}
    />
  );
}
