import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import dashboardPic from "@/public/dashboardpic.png"
export default function HomeLayout() {
  const stages = {
    stage1: {
      image: "",
      stageNum: 0o1,
      title: "Upload the recording",
      description: "Drop in the audio from your kickoff call — mp3, m4a, wav, webm."
    },
    stage2: {
      image: "",
      stageNum: 0o2,
      title: "Transcribe & parse",
      description: "Groq Whisper transcribes; a strict schema captures scope, variables, and deadlines."
    },
    stage3: {
      image: "",
      stageNum: 0o3,
      title: "Diagram the scope",
      description: "Claude Sonnet turns the parsed scope into a Mermaid architecture diagram."
    },
    stage4: {
      image: "",
      stageNum: 0o4,
      title: "Draft the follow-up",
      description: "A multi-day email sequence in your own tone, ready to review and send."
    }
  }
  return (
    <>
      <div className="bg-[#060D1A] font-sans dark:bg-black w-full h-screen overflow-y-scroll">


        {/* Navigation bar */}
        <nav className="flex flex-row justify-between text-center bg-[#060D1A]">
          <h2 className="text-white">Scopelancer</h2>
          <div className="flex flex-row gap-4 items-center">
            <span className="text-[#89929E]">How it works</span>
            <span className="text-[#89929E]">Features</span>
            <span className="text-[#89929E]">Pricing</span>
          </div>
          <div className="flex flex-row gap-x-4">
            <h2 className="text-[#89929E]">Sign in</h2>
            <Button className="bg-[#00B2F9] text-black">Get started</Button>
          </div>
        </nav>


        {/* Main content */}
        <main className="flex flex-col justify-center items-center self-center text-center space-y-6 bg-linear-to-b from-[#082940] to-transparent to-[24px] bg-padding-box pt-6 px-6 pb-6 w-full">
          <Card className = "flex flex-row items-center self-center h-min text-center justify-center text-sm text-[#89929E] bg-[#0C192B] w-[30%]">For freelancers who are done with scope creep</Card>

          <h1 className="text-white text-6xl font-bold w-[65%]">The scope you agreed to in the room, <h1 className="text-[#00B2F9]">defended in writing</h1></h1>

          <p className="text-[#89929E] w-[45%]">Upload a client kickoff call. Scopelancer transcribes it, extracts the real project scope and deadlines, diagrams it, and drafts a strategic follow-up sequence in your own tone.</p>
          {/* Buttons */}
          <div className="flex flex-row gap-x-2 text-center justify-center self-center">
            <Button className = "bg-[#00B2F9] h-10 w-[60%] text-black">
              Start a session →
            </Button>
            <Button className = "bg-[#0A1423] h-10 w-[55%] text-white">
              See how it works
            </Button>
          </div>

          {/* Dashboard picture */}
            <Image width={1000} height={1000} style={{ objectFit: "contain" }} src={dashboardPic} alt="picture of dashboard" />
        </main>
        {/* More information & features */}
        <section>
          <h1>From an hour-long call to defensible artifact</h1>

          <p>Four deterministic stages. Each one streams back into your dashboard as it completes.</p>


          {Object.entries(stages).map((stage, index) => (
            <Card className = "w-[50%]"key={index}>
              <Image src={stage[1].image} alt={stage[1].title} />
              <CardHeader>
                <div className = "flex flex-row justify-between">
                  <CardTitle>{stage[1].title}</CardTitle>
                  <CardTitle>{stage[1].stageNum}</CardTitle>
                  </div>
                  <CardDescription>{stage[1].description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
        {/* More critical information */}
        <section>
          <Card>

          </Card>
        </section>

        {/* Billing Information */}
        <section>
          <h1></h1>

          <p></p>
          <Card></Card>
        </section>

        {/* Final Information */}
        <section>
          <h1></h1>
          <p></p>
          <Button></Button>
        </section>

        {/* Footer */}
        <footer>

        </footer>
      </div>
    </>
  );
}
