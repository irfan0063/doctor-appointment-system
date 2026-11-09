import AppShell from "@/components/AppShell";
import SectionPage from "@/components/SectionPage";
export default function AppointmentsPage(){return <AppShell title="Appointments" subtitle="Review scheduled clinic appointments."><SectionPage config={{endpoint:"/appointments",title:"Appointments",fields:["Date","Reason","Status","Doctor","Patient"]}}/></AppShell>;}
