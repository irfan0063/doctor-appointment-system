import { Dashboard } from '@/components/dashboard';

export default function DoctorDashboardPage() {
  return (
    <Dashboard
      title="Doctor Dashboard"
      summary={[
        { label: 'Today Appointments', value: '8' },
        { label: 'Pending Prescriptions', value: '3' },
        { label: 'Completed Visits', value: '112' },
        { label: 'Rating', value: '4.8/5' },
      ]}
    />
  );
}
