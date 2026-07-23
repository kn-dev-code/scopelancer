import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import dashboardPic from "@/public/dashboardpic.png"
import {
  Mic,
  FileText,
  GitBranch,
  Mail,
  WaypointsIcon,
  ShieldCheck,
  Zap,
  Coins,
  Check
} from "lucide-react";
export default function HomeLayout() {
  const stages = {
    stage1: {
      icon: <Mic />,
      stageNum: "1",
      title: "Upload the recording",
      description: "Drop in the audio from your kickoff call — mp3, m4a, wav, webm."
    },
    stage2: {
      icon: <FileText />,
      stageNum: "2",
      title: "Transcribe & parse",
      description: "Groq Whisper transcribes; a strict schema captures scope, variables, and deadlines."
    },
    stage3: {
      icon: <GitBranch />,
      stageNum: "3",
      title: "Diagram the scope",
      description: "Claude Sonnet turns the parsed scope into a Mermaid architecture diagram."
    },
    stage4: {
      icon: <Mail />,
      stageNum: "4",
      title: "Draft the follow-up",
      description: "A multi-day email sequence in your own tone, ready to review and send."
    }
  }

  const benefits = {
    benefit1: {
      icon: <ShieldCheck />,
      title: "Strict structured output",
      description: "Every scope, deliverable, and deadline is validated against a schema — no vibes-based summaries."
    },
    benefit2: {
      icon: <Zap />,
      title: "Streaming pipeline",
      description: "Results appear as each stage finishes — transcript, scope, diagram, emails."
    },
    benefit3: {
      icon: <Coins />,
      title: "Pay only for what you use",
      description: "Prepaid credits metered against real audio minutes and tokens. Unused holds are refunded."
    }
  }

  const cards = {
    card1: {
      title: "Starter",
      credits: "1000",
      price: "$19",
      icon: <Check />,
      desc1: "~10 short sessions",
      desc2: "Full pipeline access",
      desc3: "Email support",
    },
    card2: {
      title: "Studio",
      credits: "3000",
      price: "$49",
      icon: <Check />,
      desc1: "~35 short sessions",
      desc2: "Full pipeline access",
      desc3: "Priority processing",
    },
    card3: {
      title: "Agency",
      credits: "8000",
      price: "$119",
      icon: <Check />,
      desc1: "~100 sessions",
      desc2: "Team seats",
      desc3: "Priority support",
    }
  }
  return (
    <>
      <div className="bg-[#060D1A] font-sans dark:bg-black w-full h-screen overflow-y-scroll">


        {/* Navigation bar */}
        <nav className="flex flex-row justify-between text-center items-center bg-[#060D1A] h-16 max-w-full mx-auto px-[12%]">
          <h2 className="text-white font-bold text-2xl flex flex-row items-center gap-x-2"><WaypointsIcon />Scopelancer</h2>
          <div className="flex flex-row gap-4 items-center">
            <span className="text-[#89929E]">How it works</span>
            <span className="text-[#89929E]">Features</span>
            <span className="text-[#89929E]">Pricing</span>
          </div>
          <div className="flex flex-row gap-x-4 text-center items-center">
            <h2 className="text-[#89929E] text-sm font-semibold">Sign in</h2>
            <Button className="bg-[#00B2F9] text-black h-10">Get started</Button>
          </div>
        </nav>


        {/* Main content */}
        <main className="flex flex-col justify-center items-center self-center text-center space-y-6 bg-linear-to-b from-[#082940] to-transparent to-[24px] bg-padding-box pt-6 px-6 pb-6 w-full border-2 border-[#121825]">
          <Card className="flex flex-row items-center self-center text-center justify-center text-sm text-[#89929E] bg-[#0C192B] w-[30%] h-8"><p className="text-[#00B2F9] text-lg">●</p> For freelancers who are done with scope creep</Card>

          <h1 className="text-white text-6xl font-bold w-[65%] tracking-normal">The scope you agreed to in the room, <h1 className="text-[#00B2F9]">defended in writing.</h1></h1>

          <p className="text-[#89929E] w-[45%]">Upload a client kickoff call. Scopelancer transcribes it, extracts the real project scope and deadlines, diagrams it, and drafts a strategic follow-up sequence in your own tone.</p>
          {/* Buttons */}
          <div className="flex flex-row gap-x-2 text-center justify-center self-center">
            <Button className="bg-[#00B2F9] h-10 w-[60%] text-black">
              Start a session →
            </Button>
            <Button className="bg-[#0A1423] h-10 w-[55%] text-white">
              See how it works
            </Button>
          </div>

          {/* Dashboard picture */}
          <Image className="border-4 border-[#1d2028] rounded-2xl shadow-xl shadow-[#082B44] ring-[#082B44]" width={1000} height={1000} style={{ objectFit: "contain" }} src={dashboardPic} alt="picture of dashboard" />
        </main>
        {/* More information & features */}
        <section className="py-20 border-2 border-[#121825]">
          <div className="flex flex-col justify-center pl-10 pb-10">
            <h1 className="text-white text-4xl font-bold w-[50%] tracking-normal">From an hour-long call to defensible artifact</h1>
            <p className="text-[#89929E] w-[50%]">Four deterministic stages. Each one streams back into your dashboard as it completes.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 place-items-center self-center w-full">
            {Object.entries(stages).map(([key, stage]) => (
              <Card className="w-[80%] bg-[#0A1423] h-[195px] border-2 border-[#1F2535]" key={key}>
                <div className="flex flex-row justify-between items-between px-6">
                  <Button className="bg-[#0C2B43] text-[#00B2F9] rounded-md h-10 border-2 border-[#0C3B58]">{stage.icon}</Button>
                  <CardTitle className="text-[#8F929E]">0{stage.stageNum}</CardTitle>
                </div>
                <CardHeader>
                  <CardTitle className="text-white font-bold">{stage.title}</CardTitle>
                  <CardDescription className="text-[#89929E] text-sm w-[85%]">{stage.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* More critical information */}
        <section className="border-2 border-[#121825] py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center w-full">
            {Object.entries(benefits).map(([key, benefit]) => (
              <Card className="w-[75%] bg-[#0A1423] h-[195px] border-2 border-[#1F2535]" key={key}>
                <CardHeader>
                  <Button className="bg-[#0C2B43] text-[#00B2F9] rounded-md h-10 border-2 border-[#0C3B58] w-[14%]">
                    {benefit.icon}
                  </Button>
                  <CardTitle className="text-white font-bold">
                    {benefit.title}
                  </CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Billing Information */}
        <section className="border-2 border-[#121825] py-16">
          <div className="pl-14 py-10">
            <h1 className="text-white text-4xl font-bold tracking-normal w-[50%]">Prepaid credits. No subscriptions.</h1>
            <p className="text-[#89929E] w-[50%]">Each run is metered against real usage — audio minutes and tokens. Unused holds are refunded.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full place-items-center gap-1">
            {Object.entries(cards).map(([key, card]) => (
              <Card className="w-[75%] bg-[#0A1423] border-2 border-[#1F2535] h-[350px]" key={key}>
                <CardHeader>
                  <CardTitle className="text-white font-bold">{card.title}</CardTitle>
                  <div className="flex flex-row items-between">
                    <CardTitle className="text-white font-bold text-4xl">{card.credits}</CardTitle>
                    <CardDescription className="mt-2 ml-2">credits</CardDescription>
                  </div>
                  <CardDescription className="text-white font-bold text-3xl">{card.price}</CardDescription>
                  <ul className="text-sm text-[#89929E] flex flex-col items-between">
                    <div className="flex flex-row items-between">
                      <li className="text-[#00B2F9]">{card.icon}</li>
                      <li>{card.desc1}</li>
                    </div>
                    <div className="flex flex-row items-between">
                      <li className="text-[#00B2F9]">{card.icon}</li>
                      <li>{card.desc2}</li>
                    </div>
                    <div className="flex flex-row items-between">
                      <li className="text-[#00B2F9]">{card.icon}</li>
                      <li>{card.desc3}</li>
                    </div>
                  </ul>
                </CardHeader>
                <Button className="ml-[10%] bg-[#0A1423] border-2 border-[#1E2635] rounded-md h-11 w-[80%]">Buy pack</Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Final Information */}
        <section className="border-2 border-[#121825] py-20">
          <div className="flex flex-col items-center self-center text-center gap-y-4">
            <h1 className="text-white text-4xl font-bold tracking-normal">Stop rewriting scope from memory.</h1>
            <p className="text-[#89929E] w-[40%]">Turn your next client call into a documented, diagrammed, and defended scope in minutes.</p>
            <Button className="bg-[#00B2F9] text-black h-11 w-[15%]">Start your first session →</Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-2 border-[#121825] py-20">
          <div className="flex flex-row items-center justify-between w-full px-[12%]">
            <div className = "flex flex-row items-center gap-x-2">
            <WaypointsIcon color = "white" />
            <h2 className="text-white text-md font-bold">Scopelancer</h2>
              </div>
            <span className="text-[#89929E] text-sm">© 2026 Scopelancer. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
