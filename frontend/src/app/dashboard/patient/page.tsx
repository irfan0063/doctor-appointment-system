import { Dashboard } from '@/components/dashboard';

export default function PatientDashboardPage() {
  return (
    <Dashboard
      title="Patient Dashboard"
      summary={[
        { label: 'Upcoming Appointments', value: '2' },
        { label: 'Past Visits', value: '17' },
        { label: 'Pending Payments', value: '$90' },
        { label: 'Prescriptions', value: '11' },
      ]}
    />
  );
}
