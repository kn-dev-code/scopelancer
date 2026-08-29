import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  Mic,
  FileText,
  GitBranch,
  Mail,
  WaypointsIcon,
  ShieldCheck,
  Zap,
  Coins,
  Check,
} from "lucide-react";
import { useTranslations } from "next-intl";
export default function HomeLayout() {
  const t = useTranslations();
  const stages = {
    stage1: {
      icon: <Mic />,
      stageNum: "1",
      title: t("section_1.stages.stage1.title"),
      description: t("section_1.stages.stage1.description"),
    },
    stage2: {
      icon: <FileText />,
      stageNum: "2",
      title: t("section_1.stages.stage2.title"),
      description: t("section_1.stages.stage2.description"),
    },
    stage3: {
      icon: <GitBranch />,
      stageNum: "3",
      title: t("section_1.stages.stage3.title"),
      description: t("section_1.stages.stage3.description"),
    },
    stage4: {
      icon: <Mail />,
      stageNum: "4",
      title: t("section_1.stages.stage4.title"),
      description: t("section_1.stages.stage4.description"),
    },
  };

  const benefits = {
    benefit1: {
      icon: <ShieldCheck />,
      title: t("features.benefit1.title"),
      description: t("features.benefit1.description"),
    },
    benefit2: {
      icon: <Zap />,
      title: t("features.benefit2.title"),
      description: t("features.benefit2.description"),
    },
    benefit3: {
      icon: <Coins />,
      title: t("features.benefit3.title"),
      description: t("features.benefit3.description"),
    },
  };

  const cards = {
    card1: {
      title: t("section_2.cards.card1.title"),
      credits: t("section_2.cards.card1.credits"),
      price: t("section_2.cards.card1.price"),
      icon: <Check />,
      desc1: t("section_2.cards.card1.desc1"),
      desc2: t("section_2.cards.card1.desc2"),
      desc3: t("section_2.cards.card1.desc3"),
    },
    card2: {
      title: t("section_2.cards.card2.title"),
      credits: t("section_2.cards.card2.credits"),
      price: t("section_2.cards.card2.price"),
      icon: <Check />,
      desc1: t("section_2.cards.card2.desc1"),
      desc2: t("section_2.cards.card2.desc2"),
      desc3: t("section_2.cards.card2.desc3"),
    },
    card3: {
      title: t("section_2.cards.card3.title"),
      credits: t("section_2.cards.card3.credits"),
      price: t("section_2.cards.card3.price"),
      icon: <Check />,
      desc1: t("section_2.cards.card3.desc1"),
      desc2: t("section_2.cards.card3.desc2"),
      desc3: t("section_2.cards.card3.desc3"),
    },
  };
  return (
    <>
      <div className="bg-[#060D1A] font-sans dark:bg-black w-full">
        {/* Navigation bar */}
        <nav className="flex flex-row justify-between text-center items-center bg-[#060D1A] h-16 max-w-full mx-auto px-[12%]">
          <h2 className="text-white font-bold text-2xl flex flex-row items-center gap-x-2">
            <WaypointsIcon />
            {t("nav.software_title")}
          </h2>
          <div className="flex flex-row gap-4 items-center">
            <Link href="#how-it-works">
              <span className="text-[#89929E] hover:text-white transition-all duration-300">
                {t("nav.how_it_works")}
              </span>
            </Link>
            <Link href="#features">
              <span className="text-[#89929E] hover:text-white transition-all duration-300">
                {t("nav.features")}
              </span>
            </Link>
            <Link href="#pricing">
              <span className="text-[#89929E] hover:text-white transition-all duration-300">
                {t("nav.pricing")}
              </span>
            </Link>
          </div>
          <div className="flex flex-row gap-x-4 text-center items-center">
            <Link href="/auth/sign-in">
              <h2 className="text-[#89929E] text-sm font-semibold hover:text-white transition-all duration-300">
                {t("nav.sign-in")}
              </h2>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-[#00B2F9] text-black h-10 hover:bg-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer">
                {t("nav.get-started")}
              </Button>
            </Link>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex flex-col justify-center items-center self-center text-center space-y-6 bg-linear-to-b from-[#082940] to-transparent to-[24px] bg-padding-box pt-6 px-6 pb-6 w-full border-2 border-[#121825]">
          <Card className="flex flex-row items-center self-center text-center justify-center text-sm text-[#89929E] bg-[#0C192B] w-[30%] h-8">
            <p className="text-[#00B2F9] text-lg">●</p> {t("main.badge")}
          </Card>

          <h1 className="text-white text-6xl font-bold w-[65%] tracking-normal">
            {t("main.header")}{" "}
          </h1>
          <h1 className="text-[#00B2F9] text-6xl font-bold w-[65%] tracking-normal">
            {t("main.additionalHeader")}
          </h1>

          <p className="text-[#89929E] w-[45%]">{t("main.description")}</p>
          {/* Buttons */}
          <div className="flex flex-row gap-x-2 text-center justify-center self-center">
            <Link
              className="bg-[#00B2F9] h-10 w-[60%] text-black hover:bg-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer rounded-2xl"
              href="/auth/sign-up"
            >
              <Button className="bg-[#00B2F9] h-10 w-[60%] text-black hover:bg-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer">
                {t("main.start-session")}
              </Button>
            </Link>
            <Link
              className="bg-[#0A1423] w-[55%] rounded-2xl hover:cursor-pointer"
              href="#how-it-works"
            >
              <Button className="bg-[#0A1423] h-10 w-[55%] text-white hover:bg-[#0A1423]/80 transition-all duration-300 hover:cursor-pointer">
                {t("main.see-how-it-works")}
              </Button>
            </Link>
          </div>

          {/* Dashboard picture */}
          <Image
            src="/dashboardpic.png"
            className="border-4 border-[#1d2028] rounded-2xl shadow-xl shadow-[#082B44] ring-[#082B44]"
            width={1000}
            height={1000}
            style={{ objectFit: "contain" }}
            alt={t("main.dashboardAlt")}
          />
        </main>
        {/* More information & features */}
        <section id="how-it-works" className="py-20 border-2 border-[#121825]">
          <div className="flex flex-col justify-center pl-10 pb-10">
            <h1 className="text-white text-4xl font-bold w-[50%] tracking-normal">
              {t("section_1.title")}
            </h1>
            <p className="text-[#89929E] w-[50%]">
              {t("section_1.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 place-items-center self-center w-full">
            {Object.entries(stages).map(([key, stage]) => (
              <Card
                className="w-[80%] bg-[#0A1423] h-48.75 border-2 border-[#1F2535]"
                key={key}
              >
                <div className="flex flex-row justify-between items-between px-6">
                  <Button className="bg-[#0C2B43] text-[#00B2F9] rounded-md h-10 border-2 border-[#0C3B58]">
                    {stage.icon}
                  </Button>
                  <CardTitle className="text-[#8F929E]">
                    0{stage.stageNum}
                  </CardTitle>
                </div>
                <CardHeader>
                  <CardTitle className="text-white font-bold">
                    {stage.title}
                  </CardTitle>
                  <CardDescription className="text-[#89929E] text-sm w-[85%]">
                    {stage.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* More critical information */}
        <section id="features" className="border-2 border-[#121825] py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center w-full">
            {Object.entries(benefits).map(([key, benefit]) => (
              <Card
                className="w-[75%] bg-[#0A1423] h-48.75% border-2 border-[#1F2535]"
                key={key}
              >
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
        <section id="pricing" className="border-2 border-[#121825] py-16">
          <div className="pl-14 py-10">
            <h1 className="text-white text-4xl font-bold tracking-normal w-[50%]">
              {t("section_2.title")}
            </h1>
            <p className="text-[#89929E] w-[50%]">
              {t("section_2.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full place-items-center gap-1">
            {Object.entries(cards).map(([key, card]) => (
              <Card
                className="w-[75%] bg-[#0A1423] border-2 border-[#1F2535] h-87.5%"
                key={key}
              >
                <CardHeader>
                  <CardTitle className="text-white font-bold">
                    {card.title}
                  </CardTitle>
                  <div className="flex flex-row items-between">
                    <CardTitle className="text-white font-bold text-4xl">
                      {card.credits}
                    </CardTitle>
                    <CardDescription className="mt-2 ml-2">
                      {t("section_2.credits")}
                    </CardDescription>
                  </div>
                  <CardDescription className="text-white font-bold text-3xl">
                    {card.price}
                  </CardDescription>
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
                <Button className="ml-[10%] bg-[#0A1423] border-2 border-[#1E2635] rounded-md h-11 w-[80%]">
                  {t("section_2.buy_pack")}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Final Information */}
        <section className="border-2 border-[#121825] py-20">
          <div className="flex flex-col items-center self-center text-center gap-y-4">
            <h1 className="text-white text-4xl font-bold tracking-normal">
              {t("section_3.title")}
            </h1>
            <p className="text-[#89929E] w-[40%]">
              {t("section_3.description")}
            </p>
            <Link
              className="bg-[#00B2F9] text-black h-11 w-[15%] transition-all duration-300 hover:cursor-pointer rounded-2xl"
              href="/auth/sign-up"
            >
              <Button className="bg-[#00B2F9] text-black h-11 w-[15%] hover:bg-[#00B2F9]/80 transition-all duration-300 rounded-2xl hover:cursor-pointer">
                {t("section_3.start_your_first_session")}
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-2 border-[#121825] py-20">
          <div className="flex flex-row items-center justify-between w-full px-[12%]">
            <div className="flex flex-row items-center gap-x-2">
              <WaypointsIcon color="white" />
              <h2 className="text-white text-md font-bold">
                {t("footer.title")}
              </h2>
            </div>
            <span className="text-[#89929E] text-sm">
              {t("footer.footer_description")}
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
