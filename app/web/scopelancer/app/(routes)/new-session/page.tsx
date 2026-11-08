"use client";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mic, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios/api";
import { getPresignedUrl } from "@/app/external_server/aws-actions";
import { useRouter } from "next/navigation";

const NewSession = () => {
  const t = useTranslations();
  const [file, setFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [tools, setTools] = useState<string[]>(["TRANSCRIBE"]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const LLMToolCost = {
    TRANSCRIBE: {
      costperMinute: 0.2,
    },
    SCOPEDOCUMENT: {
      baseCost: 0.1,
    },
    FLOWDIAGRAM: {
      baseCost: 0.12,
    },
    EMAIL: {
      baseCost: 0.08,
    },
  } as const;

  const MAX_FILE_SIZE_MB = 25;

  // Initialize total credits
  const calculateTotalCredits = (
    audioDurationSeconds: number,
    selectedTools: string[],
  ) => {
    const audioDuration = Math.ceil(audioDurationSeconds / 60);
    let cost = 0;
    if (selectedTools.includes("TRANSCRIBE")) {
      cost += audioDuration * LLMToolCost["TRANSCRIBE"].costperMinute;
    }
    if (selectedTools.includes("SCOPEDOCUMENT")) {
      cost += LLMToolCost["SCOPEDOCUMENT"].baseCost;
    }
    if (selectedTools.includes("FLOWDIAGRAM")) {
      cost += LLMToolCost["FLOWDIAGRAM"].baseCost;
    }
    if (selectedTools.includes("EMAIL")) {
      cost += LLMToolCost["EMAIL"].baseCost;
    }

    return Number(cost.toFixed(2));
  };

  const estimatedCost = calculateTotalCredits(audioDuration, tools);

  const toggleToolInput = (toolId: string) => {
    setTools((prev) => {
      const nextTools = prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId];

      setValue("deliverables", nextTools, { shouldValidate: true });
      return nextTools;
    });
  };

  // Checking file input error
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile) {
      // Check file type
      const fileType =
        selectedFile?.name.endsWith(".mp4") ||
        selectedFile?.name.endsWith(".wav") ||
        selectedFile?.name.endsWith(".m4a") ||
        selectedFile?.name.endsWith(".mp3");
      // Check file size
      const fileSize = selectedFile?.size;
      // Is file type incorrect?
      if (!fileType) {
        toast.add({
          title: "Incorrect file type",
          type: "error",
          description: "Please upload an MP3, MP4, WAV, or M4A file.",
        });
      }

      // Is file too large?
      if (fileSize > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.add({
          title: "File too large!",
          type: "error",
          description: "Please try again",
        });
      }
      if (fileType) {
        toast.add({
          title: "File loaded successfully",
          type: "success",
        });
      }

      const objectURL = URL.createObjectURL(selectedFile);
      const audio = new Audio(objectURL);
      audio.onloadedmetadata = () => {
        setAudioDuration(audio.duration);
        URL.revokeObjectURL(objectURL);
      };
      setFile(selectedFile);
      setValue("clientFile", selectedFile, { shouldValidate: true });
    }
  };

  const sessionSchema = z.object({
    clientFile: z
      .custom<File>((file) => file instanceof File)
      .refine((file) => file instanceof File, {
        message: "Must be a file type.",
      })
      .refine(
        (file) =>
          file?.name.endsWith(".mp4") ||
          file?.name.endsWith(".m4a") ||
          file?.name.endsWith("wav") ||
          file?.name.endsWith("mp3"),
        { message: "File must end in MP4, MP3, WAV, or M4A" },
      )
      .refine(
        (file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024,
        "File size must be under 25MB",
      ),
    sessionTitle: z.string().min(1, "Please provide a session title"),
    client: z.string().min(1, "Please provide a client name"),
    context: z.string().min(1).optional(),
    deliverables: z.array(z.string()).min(1, "Select at least one deliverable"),
    emailType: z.enum(["Professional", "Friendly", "Direct"]).optional(),
  });
  const fastapiBaseUrl =
    process.env.NEXT_PUBLIC_FASTAPI_BASE_URL || "http://localhost:8000";

  type SessionInput = z.infer<typeof sessionSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SessionInput>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      clientFile: undefined,
      sessionTitle: "",
      client: "",
      context: "",
      deliverables: ["TRANSCRIBE"],
    },
  });

  const createSessionMutation = useMutation({
    mutationFn: async (formData: SessionInput) => {
      const presignedRes = await getPresignedUrl({
        fileName: formData.clientFile.name,
        fileType: formData.clientFile.type,
        fileSize: formData.clientFile.size,
      });

      console.log("PRESIGNED RESPONSE FROM SERVER:", presignedRes);

      if (
        !presignedRes.success ||
        !presignedRes.uploadUrl ||
        !presignedRes.key
      ) {
        throw new Error("Upload url not authorized.");
      }

      await api.put(presignedRes.uploadUrl, formData.clientFile, {
        baseURL: "",
        headers: { "Content-Type": formData.clientFile.type },
      });

      const sessionPayload = {
        clientFileKey: presignedRes.key,
        sessionTitle: formData.sessionTitle,
        client: formData.client,
        context: formData.context,
        deliverables: formData.deliverables,
        emailType: formData.emailType,
      };

      const backendResponse = await api.post(
        "/api/sessions/users",
        sessionPayload,
      );
      const llmResponse = await api.post(
        `${fastapiBaseUrl}/file/file-conversion`,
        sessionPayload,
      );

      return { dbData: backendResponse.data, llmData: llmResponse.data };
    },
    onSuccess: () => {
      toast.add({ title: "Session successfully created!", type: "success" });
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      toast.add({ title: error.message || "Submission failed", type: "error" });
    },
  });

  const onSubmit = (formData: SessionInput) => {
    createSessionMutation.mutate(formData);
  };

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/model");
    }, 7000);
  };

  // PATCH data
  const queryClient = useQueryClient();
  const patchSessionData = useMutation({
    mutationFn: async ({
      sessionId,
      patchedData,
    }: {
      sessionId: string;
      patchedData: Partial<z.infer<typeof sessionSchema>>;
    }) => {
      const response = await api.patch(
        `/api/sessions/users/${sessionId}`,
        patchedData,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // DELETE data
  const deleteSessionData = useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await api.delete(`/api/sessions/users/${sessionId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

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
          {/* Form Input */}
          <form onSubmit={handleSubmit(onSubmit)}>
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
              {/* 1. File Input */}
              <div className="border border-dashed rounded-2xl hover:border-[#00B2F9] transition-all duration-300 ease-in-out flex flex-col justify-center">
                <FieldSet>
                  <FieldGroup>
                    <Input
                      onChange={handleFileInput}
                      className="text-[#0D1624] bg-[#0D1624] placeholder:text-[#0D1624] p-20 hover:cursor-pointer hover:bg-[#0D1624]/80"
                      type="file"
                    />
                    {errors.clientFile && (
                      <p
                        className="text-sm relative top-7"
                        style={{ color: "red" }}
                      >
                        {errors.clientFile?.message}
                      </p>
                    )}
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
                      {/* 2. Client Title */}
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
                        {...register("sessionTitle")}
                      />
                      {errors.sessionTitle && (
                        <p className="text-sm" style={{ color: "red" }}>
                          {errors.sessionTitle.message}
                        </p>
                      )}
                    </Field>
                    <Field>
                      {/* 3. Client Name */}
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
                        {...register("client")}
                        className="bg-[#09101E] border border-[#272C39] rounded-sm p-5 text-white"
                      />
                    </Field>
                  </div>
                  <Field>
                    {/* 4. Optional Context For the Model */}
                    <FieldLabel className="text-[#7F848D]">
                      {t("newSession.sessionDetails.contextLabel")}
                    </FieldLabel>
                    <Textarea
                      className="border border-[#272C39] bg-[#09101E] placeholder:text-[#7F848D] rounded-sm text-white"
                      {...register("context")}
                      placeholder={t(
                        "newSession.sessionDetails.contextPlaceholder",
                      )}
                    />
                    {errors.context && (
                      <p className="text-sm text-red-500">
                        {errors.context.message}
                      </p>
                    )}
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
                  {/* 5. Deliverables for the model */}
                  {/* Settings 1-2 */}
                  <div className="flex flex-row justify-center gap-x-4">
                    <Button
                      onClick={() => {
                        toggleToolInput("TRANSCRIBE");
                      }}
                      type="button"
                      className={`border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539] ${
                        tools.includes("TRANSCRIBE")
                          ? "bg-[#0E2539] border-[#00B2F9]"
                          : "border-[#202735] bg-[#0D1624]"
                      }`}
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
                        toggleToolInput("SCOPEDOCUMENT");
                      }}
                      type="button"
                      className={`border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539] ${
                        tools.includes("SCOPEDOCUMENT")
                          ? "bg-[#0E2539] border-[#00B2F9]"
                          : "border-[#202735] bg-[#0D1624]"
                      }`}
                    >
                      {errors.deliverables && (
                        <p className="text-sm text-red-500">
                          {errors.deliverables.message}
                        </p>
                      )}
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
                        toggleToolInput("FLOWDIAGRAM");
                      }}
                      type="button"
                      className={`border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539] ${
                        tools.includes("FLOWDIAGRAM")
                          ? "bg-[#0E2539] border-[#00B2F9]"
                          : "border-[#202735] bg-[#0D1624]"
                      }`}
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
                        toggleToolInput("EMAIL");
                      }}
                      type="button"
                      className={`border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539] ${
                        tools.includes("EMAIL")
                          ? "bg-[#0E2539] border-[#00B2F9]"
                          : "border-[#202735] bg-[#0D1624]"
                      }`}
                    >
                      {errors.deliverables && (
                        <p className="text-sm text-red-500">
                          {errors.deliverables.message}
                        </p>
                      )}
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
                          <SelectItem
                            {...register("emailType")}
                            key={idx}
                            value={tone.value || ""}
                          >
                            {tone.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.emailType && (
                    <p className="text-sm text-red-500">
                      {errors.emailType.message}
                    </p>
                  )}
                </FieldGroup>
              </FieldSet>
            </div>
            <div className="flex flex-row justify-between gap-x-7 pt-5 pb-7">
              <div className="flex flex-row gap-x-2">
                <p className="text-[#5D6672] text-sm">
                  {t("newSession.estimatedCost")}
                </p>
                <span className="text-white text-sm">{estimatedCost}</span>
              </div>
              <div className="flex pr-12 gap-x-2">
                <Link href="/dashboard">
                  <Button className="p-5 bg-[#0A1423] hover:scale-105 hover:bg-[#0A1423]/80 hover:duration-300 hover:transition-all border-2 border-[#151D2C] hover:cursor-pointer">
                    {t("common.cancel")}
                  </Button>
                </Link>
                <Button
                  className="bg-[#00B2F9] text-black p-5 w-[85%] hover:scale-105 hover:bg-[#00B2F9]/80 hover:transition-all hover:duration-300 hover:cursor-pointer"
                  type="submit"
                  onClick={handleClick}
                >
                  <Sparkles />
                  {isLoading
                    ? "Awaiting Model...."
                    : t("newSession.startSession")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSession;
