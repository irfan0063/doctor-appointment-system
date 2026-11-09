import AppShell from "@/components/AppShell";
import SectionPage from "@/components/SectionPage";
export default function PrescriptionsPage(){return <AppShell title="Prescriptions" subtitle="Review prescriptions created for appointments."><SectionPage config={{endpoint:"/prescriptions",title:"Prescriptions",fields:["Diagnosis","Notes","Appointment","CreatedAt"]}}/></AppShell>;}
