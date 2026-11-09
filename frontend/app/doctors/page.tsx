import AppShell from "@/components/AppShell";
import SectionPage from "@/components/SectionPage";
export default function DoctorsPage(){return <AppShell title="Doctors" subtitle="Search and review registered doctors."><SectionPage config={{endpoint:"/doctors",title:"Doctors",fields:["Name","Specialty","City","Phone","Fee"],filters:true}}/></AppShell>;}
