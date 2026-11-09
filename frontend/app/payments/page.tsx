import AppShell from "@/components/AppShell";
import SectionPage from "@/components/SectionPage";
export default function PaymentsPage(){return <AppShell title="Payments" subtitle="Review payments recorded in the clinic system."><SectionPage config={{endpoint:"/payments",title:"Payments",fields:["AmountPkr","Method","Reference","Status","CreatedAt"]}}/></AppShell>;}
