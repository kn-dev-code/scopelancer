import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Mic, UploadCloud } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useTranslations } from "next-intl";
const NewSession = () => {
  const t = useTranslations();
  const { audioId } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [tools, setTools] = useState<string[]>(["transcribe"]);
  const deliverableCount = useRef(null);

  const emailTone = [
    {
      label: t("newSession.deliverables.emailToneOptions.select"),
      value: null,
    },
    {
      label: t("newSession.deliverables.emailToneOptions.professional"),
      value: "Professional",
    },
    {
      label: t("newSession.deliverables.emailToneOptions.friendly"),
      value: "Friendly",
    },
    {
      label: t("newSession.deliverables.emailToneOptions.direct"),
      value: "Direct",
    },
  ];

  const audioFileConfig = {
    MP3: {
      audioType: "MP3",
      startsWith: ".mp3",
    },
    WAV: {
      audioType: "WAV",
      startsWith: ".wav",
    },
    M4A: {
      audioType: "M4A",
      startsWith: ".m4a",
    },
  } as const;

  const LLMToolCost = {
    transcribe: {
      costperMinute: 0.2,
    },
    "scope-document": {
      baseCost: 0.1,
    },
    "flow-diagram": {
      baseCost: 0.12,
    },
    email: {
      baseCost: 0.08,
    },
  } as const;

  const audioTool = audioFileConfig[audioId as keyof typeof audioFileConfig];
  const MAX_FILE_SIZE_MB = 25;

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const fileType = file?.name.endsWith(audioTool.startsWith);
      // Check file size
      const fileSize = file?.size;
      // Is file too large?
      if (fileSize > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.add({
          title: "File too large!",
          type: "error",
          description: "Please try again",
        });
      }
      setFile(file);
    }
  };

  const calculateTotalCredits = (
    audioDurationSeconds: number,
    selectedTools: string[],
  ) => {
    const audioDuration = audioDurationSeconds / 60;
    let totalCredits = 0;
    if (selectedTools.includes("transcribe")) {
      totalCredits += audioDuration * LLMToolCost["transcribe"].costperMinute;
    }
    if (selectedTools.includes("scope-document")) {
      totalCredits += LLMToolCost["scope-document"].baseCost;
    }
    if (selectedTools.includes("flow-diagram")) {
      totalCredits += LLMToolCost["flow-diagram"].baseCost;
    }
    if (selectedTools.includes("email")) {
      totalCredits += LLMToolCost["email"].baseCost;
    }

    return totalCredits;
  };

  const toggleToolInput = (toolId: string) => {
    setTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId],
    );
  };

  return (
    <div className="bg-[#060D1A] font-sans w-full h-screen overflow-y-auto pt-5">
      {/* Form Container */}
      <div className="flex flex-col place-self-center mx-auto justify-center">
        <Link
          href="/dashboard"
          className="text-[#7F848D] text-sm hover:text-white transition-all duration-300 ease-in-out pb-5 w-[20%]"
        >
          {t("newSession.backToDashboard")}
        </Link>
        <div>
          <div className="flex flex-row pr-7 gap-x-2">
            {/* Mic container */}
            <div className="p-2 bg-[#08253C] border-2 border-[#073E5C] w-[6%] rounded-full flex justify-center place-self-center">
              <Mic className="text-[#00B2F9]" />
            </div>
            {/* Text container */}
            <div className="flex justify-center flex-col">
              <h1 className="text-white font-bold text-xl">
                {t("newSession.title")}
              </h1>
              <p className="text-[#828B97]">{t("newSession.subtitle")}</p>
            </div>
          </div>
        </div>
        <br />
        <div className="flex flex-col justify-center self-center gap-y-4">
          <form>
            {/* Recording Box */}
            <div className="p-7 w-3xl border-2 border-[#202735] bg-[#0D1624] rounded-2xl">
              {/* Headers */}
              <FieldLabel className="text-white font-bold">
                {t("newSession.recording.label")}
              </FieldLabel>
              <FieldLabel className="text-[#7F848D] text-sm">
                {t("newSession.recording.hint")}
              </FieldLabel>
              <span className="text-[#0D1624]">-</span>
              {/* Form Input */}
              <div className="border border-dashed rounded-2xl hover:border-[#00B2F9] transition-all duration-300 ease-in-out flex flex-col justify-center">
                <FieldSet>
                  <FieldGroup>
                    <Input
                      onChange={handleFileInput}
                      className="text-[#0D1624] bg-[#0D1624] placeholder:text-[#0D1624] p-20 hover:cursor-pointer hover:bg-[#0D1624]/80"
                      type="file"
                    />
                  </FieldGroup>
                </FieldSet>
              </div>
            </div>
            {/* Seperation */}
            <span className="text-[#0D1624]">--</span>
            {/* Session Details */}
            <div className="p-6 w-3xl border-2 border-[#202735] flex flex-col bg-[#0D1624] rounded-2xl">
              <FieldSet>
                <FieldGroup>
                  <FieldLabel className="text-white font-bold">
                    {t("newSession.sessionDetails.label")}
                  </FieldLabel>
                  <div className="flex flex-row justify-center gap-x-4">
                    <Field>
                      <FieldLabel id="session-name" className="text-[#7F848D]">
                        {t("newSession.sessionDetails.titleLabel")}
                      </FieldLabel>
                      <Input
                        placeholder={t(
                          "newSession.sessionDetails.titlePlaceholder",
                        )}
                        id="session-name"
                        type="text"
                        className="bg-[#09101E] border border-[#272C39] rounded-sm p-5 text-white"
                      />
                    </Field>
                    <Field>
                      <FieldLabel
                        id="session-client"
                        className="text-[#7F848D]"
                      >
                        {t("newSession.sessionDetails.clientLabel")}
                      </FieldLabel>
                      <Input
                        id="session-client"
                        placeholder={t(
                          "newSession.sessionDetails.clientPlaceholder",
                        )}
                        type="text"
                        className="bg-[#09101E] border border-[#272C39] rounded-sm p-5 text-white"
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel className="text-[#7F848D]">
                      {t("newSession.sessionDetails.contextLabel")}
                    </FieldLabel>
                    <Textarea
                      className="border border-[#272C39] bg-[#09101E] placeholder:text-[#7F848D] rounded-sm text-white"
                      placeholder={t(
                        "newSession.sessionDetails.contextPlaceholder",
                      )}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
            {/* Seperation */}
            <span className="text-[#0D1624]">--</span>
            {/* Deliverables */}
            <div className="p-6 w-3xl border-2 border-[#202735] flex flex-col bg-[#0D1624] rounded-2xl">
              <FieldSet>
                <FieldGroup>
                  <FieldLabel className="text-white font-bold">
                    {t("newSession.deliverables.label")}
                  </FieldLabel>
                  {/* Settings 1-2 */}
                  <div className="flex flex-row justify-center gap-x-4">
                    <Button
                      onClick={() => {
                        toggleToolInput("transcript");
                      }}
                      type="button"
                      className="border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539]"
                    >
                      <Field>
                        <FieldLabel className="text-white font-bold">
                          {t("newSession.deliverables.transcript.title")}
                        </FieldLabel>
                        <FieldDescription className="text-[#7F848D]">
                          {t("newSession.deliverables.transcript.description")}
                        </FieldDescription>
                      </Field>
                    </Button>
                    <Button
                      onClick={() => {
                        toggleToolInput("scope-document");
                      }}
                      type="button"
                      className="border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539]"
                    >
                      <Field>
                        <FieldLabel className="text-white font-bold">
                          {t("newSession.deliverables.scopeDocument.title")}
                        </FieldLabel>
                        <FieldDescription className="text-[#7F848D]">
                          {t(
                            "newSession.deliverables.scopeDocument.description",
                          )}
                        </FieldDescription>
                      </Field>
                    </Button>
                  </div>
                  {/* Settings 3-4 */}
                  <div className="flex flex-row justify-center gap-x-4">
                    <Button
                      onClick={() => {
                        toggleToolInput("flow-diagram");
                      }}
                      type="button"
                      className="border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539]"
                    >
                      <Field>
                        <FieldLabel className="text-white font-bold">
                          {t("newSession.deliverables.flowDiagram.title")}
                        </FieldLabel>
                        <FieldDescription className="text-[#7F848D]">
                          {t("newSession.deliverables.flowDiagram.description")}
                        </FieldDescription>
                      </Field>
                    </Button>
                    <Button
                      onClick={() => {
                        toggleToolInput("email");
                      }}
                      type="button"
                      className="border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539]"
                    >
                      <Field>
                        <FieldLabel className="text-white font-bold">
                          {t("newSession.deliverables.followUpEmail.title")}
                        </FieldLabel>
                        <FieldDescription className="text-[#7F848D]">
                          {t(
                            "newSession.deliverables.followUpEmail.description",
                          )}
                        </FieldDescription>
                      </Field>
                    </Button>
                  </div>
                  <FieldLabel className="text-[#7F848D]">
                    {t("newSession.deliverables.emailToneLabel")}
                  </FieldLabel>
                  <Select items={emailTone}>
                    <SelectTrigger className="bg-[#08111E] w-[30%] hover:border hover:border-[#00B2F9]">
                      <SelectValue className="text-white" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t("newSession.deliverables.emailStyleGroupLabel")}
                        </SelectLabel>
                        {emailTone.map((tone, idx) => (
                          <SelectItem key={idx} value={tone.value || ""}>
                            {tone.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </FieldSet>
            </div>
            <div>
              <p>{t("newSession.estimatedCost")}</p>
              <Link href="/dashboard">
                <Button>{t("common.cancel")}</Button>
              </Link>
              <Link href="">
                <Button type="submit">{t("newSession.startSession")}</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSession;
