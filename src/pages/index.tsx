import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Landing from "@/components/Landing";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col h-screen">
      <PageNavbar></PageNavbar>
      <div className="flex-grow h-full">{session ? <Dashboard /> : <Landing />}</div>
      <PageFooter></PageFooter>
    </main>
  );
}
