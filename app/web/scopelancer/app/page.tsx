import Image from "next/image";
import NavBar from "./pages/navbar";
import SideBar from "./pages/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

export default function HomeLayout() {
  const userInformation = {
    sessionCard: {
      title: "Total Sessions",
      icon: null,
     /* Will render later for user's total sessions */ value: 0,
      message: "Across all clients"
    },
    activeSessionsCard: {
      title: "Active runs",
      icon: null,
      value: 0, /* Will render later for user's active runs */
      message: "Currently processing"
    },
    completedSessionsCard: {
      title: "Completed",
      icon: null,
      value: 0, /* Will render later for user's completed sessions */
      message: "Scope documented"
    },
    creditBalanceCard: {
      title: "Credits",
      icon: null,
      value: 0, /* Will render later for user's credit balance */
    }
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <NavBar />
        <SideBar />
        <div>
          {/* Welcome and small description container */}
          <div className = "flex flex-col">
            {/* Will render later for user's name */}
            <h1>Welcome back, John Doe</h1>
            <span>Turn your client calls into scope you can defend in writing.</span>
          </div>
          <Button>
            + New Session
          </Button>
          {/* User information container */}
          <div className = "grid grid-cols-4 gap-x-3">
        
          </div>
        </div>
      </main>
    </div>
  );
}
