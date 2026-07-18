import Image from "next/image";
import NavBar from "./pages/navbar";
import SideBar from "./pages/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
      message: "Available balance"
    }
  }
  return (
    <>
      <div className="bg-[#0A0F13] font-sans dark:bg-black w-full h-screen overflow-hidden">
      <NavBar />
      <SideBar/>
        <main className="bg-[#0A0F13] w-[80%] py-32 px-16 dark:bg-black sm:items-start relative left-[20%] bottom-full border-2 border-[#22272C] h-screen">
            {/* Welcome and small description container */}
            <div className="flex flex-col justify-between w-[85%] place-self-center relative left-0 bottom-14">
              {/* Will render later for user's name */}
              <h1 className="text-white text-2xl font-bold">Welcome back, John Doe</h1>
              <div className="flex flex-row justify-self-center justify-between">
                <span className="text-[#9199A2] text-sm">Turn your client calls into scope you can defend in writing.</span>
                <Button className="bg-[#2EA2E6] text-black rounded-lg h-10 hover:bg-[#2EA2E6]/80 hover:cursor-pointer">
                  + New Session
                </Button>
              </div>
            </div>

            {/* User information container */}
            <div className="grid grid-cols-4 gap-x-3 w-[95%] self-center justify-self-end pt-11 relative bottom-20">
              {Object.entries(userInformation).map(([key, card]) => (
                <Card className="bg-[#12161D] border-2 border-[#202327] rounded-2xl" key={key}>
                  <CardHeader>
                    <CardTitle className="text-[#9199A2] text-md">{card.title}</CardTitle>
                    <CardDescription className="text-white text-xl">{card.value}</CardDescription>
                    <CardDescription className="text-[#9199A2]">{card.message}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Recent sessions container */}
            <div>
              {/* Header display for recent sessions and the count */}
              <div className="flex flex-row justify-between">
                <h2>Recent sessions</h2>
                {/* Will render later for user's total sessions */}
                <span>0 total</span>
              </div>
              {/* Recent sessions list (In processing) */}


            </div>
        </main>
      </div>
    </>
  );
}
