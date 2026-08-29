"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ActivityIcon,
  CheckIcon,
  CoinsIcon,
  FileIcon,
  ShieldCheckIcon,
  XIcon,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "../pages/navbar";
import SideBar from "../pages/sidebar";
import { client } from "@/lib/betterauth/client";
import { useTranslations } from "next-intl";
// Dashboard not working to query user's credentials
const Dashboard = () => {
  const router = useRouter();
  const t = useTranslations();
  const { data, isPending, error, refetch } = client.useSession();
  const userInformation = {
    sessionCard: {
      title: t("dashboard.cards.totalSessions.title"),
      icon: <FileIcon />,
      link: "/sessions",
      /* Will render later for user's total sessions */ value: 0,
      message: t("dashboard.cards.totalSessions.message"),
    },
    activeSessionsCard: {
      title: t("dashboard.cards.activeRuns.title"),
      icon: <ActivityIcon />,
      link: "/sessions/active",
      value: 0 /* Will render later for user's active runs */,
      message: t("dashboard.cards.activeRuns.message"),
    },
    completedSessionsCard: {
      title: t("dashboard.cards.completed.title"),
      icon: <ShieldCheckIcon />,
      link: "/sessions/completed",
      value: 0 /* Will render later for user's completed sessions */,
      message: t("dashboard.cards.completed.message"),
    },
    creditBalanceCard: {
      title: t("dashboard.cards.credits.title"),
      icon: <CoinsIcon />,
      link: "/billings",
      value: 0 /* Will render later for user's credit balance */,
      message: t("dashboard.cards.credits.message"),
    },
  };
  const STATUS_STYLES = {
    Diagramming: {
      label: t("status.diagramming"),
      color: "bg-[#152430]",
      textColor: "text-[#2FA1E4]",
      icon: <Spinner className="h-4 w-4 animate-spin" />,
    },
    Completed: {
      label: t("status.completed"),
      color: "bg-[#1E2E29]",
      textColor: "text-[#62B465]",
      icon: <CheckIcon className="h-4 w-4" />,
    },
    Failed: {
      label: t("status.failed"),
      color: "bg-[#2A1F22]",
      textColor: "text-[#EA4647]",
      icon: <XIcon className="h-4 w-4" />,
    },
  } as const;

  type SessionStatusType = keyof typeof STATUS_STYLES;

  const handleSessionStatus = (status: SessionStatusType) => {
    return STATUS_STYLES[status] || <Spinner />;
  };

  if (isPending) {
    return <div className="bg-black">{t("dashboard.loading")}</div>;
  }

  const handleSessionNav = () => {
    router.push("/sessions");
  };

  return (
    <>
      <div className="bg-[#0A0F13] font-sans dark:bg-black w-full h-screen overflow-hidden">
        <NavBar />
        <SideBar />
        <main className="bg-[#0A0F13] w-[80%] py-32 px-16 dark:bg-black sm:items-start relative left-[20%] bottom-full border-2 border-[#22272C] h-screen">
          {/* Welcome and small description container */}
          <div className="flex flex-col justify-between w-[85%] relative left-12 bottom-14">
            {/* Will render later for user's name */}
            <h1 className="text-white text-2xl font-bold">
              {t("dashboard.welcomeBack", { name: data?.user?.name ?? "" })}
            </h1>
            <div className="flex flex-row justify-self-center justify-between">
              <span className="text-[#9199A2] text-sm">
                {t("dashboard.subtitle")}
              </span>
              <div className="relative left-[12%] bottom-4">
                <Button
                  onClick={handleSessionNav}
                  className="bg-[#2EA2E6] text-black rounded-lg h-10 hover:bg-[#2EA2E6]/80 hover:cursor-pointer"
                >
                  {t("dashboard.newSession")}
                </Button>
              </div>
            </div>
          </div>

          {/* User information container */}
          <div className="grid grid-cols-4 gap-x-3 w-[95%] self-center justify-self-end pt-11 relative bottom-20">
            {Object.entries(userInformation).map(([key, card]) => (
              <Link href={card.link}>
                <Card
                  className="bg-[#12161D] border-2 border-[#202327] rounded-2xl hover:border-2 hover:border-[#2E9EE0] hover:cursor-pointer hover:transition hover:duration-500 hover:ease-in-out"
                  key={key}
                >
                  <CardHeader>
                    <div className="flex flex-row justify-between">
                      <CardTitle className="text-[#9199A2] text-md">
                        {card.title}
                      </CardTitle>
                      <CardDescription>{card.icon}</CardDescription>
                    </div>
                    <CardDescription className="text-white text-xl">
                      {card.value}
                    </CardDescription>
                    <CardDescription className="text-[#9199A2]">
                      {card.message}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent sessions container */}
          <div>
            {/* Header display for recent sessions and the count */}
            <div className="flex flex-row justify-between items-center pb-8">
              <h2 className="text-white font-bold text-lg">
                {t("dashboard.recentSessions.title")}
              </h2>
              {/* Will render later for user's total sessions */}
              <span className="text-[#9199A2] text-lg">
                {t("dashboard.recentSessions.totalCount", { count: 0 })}
              </span>
            </div>
            <div>
              <Card className="bg-[#12161D] border-2 border-[#202327] rounded-2xl w-[25%] h-48 hover:border-2 hover:border-[#2E9EE0] hover:cursor-pointer hover:transition hover:duration-500 hover:ease-in-out">
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <CardTitle className="text-[#9199A2] text-md">
                      <Spinner />
                    </CardTitle>{" "}
                    {/* Company Name */}
                    <CardTitle className="">
                      <Skeleton className="w-24" />
                    </CardTitle>{" "}
                    {/* Session Title */}
                    <Button className="rounded-lg">
                      <Skeleton className="w-24" />
                    </Button>{" "}
                    {/* Session Status */}
                  </div>
                  <CardDescription className="text-white text-xl">
                    <Skeleton className="w-24" />
                  </CardDescription>
                  <CardDescription className="text-[#9199A2]">
                    <Skeleton className="w-24" />
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            {/* Recent sessions list (In processing) */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
