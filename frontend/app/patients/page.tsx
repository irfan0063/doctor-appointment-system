import AppShell from "@/components/AppShell";
import SectionPage from "@/components/SectionPage";
export default function PatientsPage(){return <AppShell title="Patients" subtitle="Search and review patient records."><SectionPage config={{endpoint:"/patients",title:"Patients",fields:["Name","CNIC","Phone","Gender","City"]}}/></AppShell>;}
