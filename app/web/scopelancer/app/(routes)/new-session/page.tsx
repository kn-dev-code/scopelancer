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
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Mic, UploadCloud } from "lucide-react";
import { toast } from "@/components/ui/toast";
const NewSession = () => {
  const { audioId } = useParams();
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isScoping, setIsScoping] = useState(false);
  const [isDiagramming, setIsDiagramming] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const deliverableCount = useRef(null);

  const emailTone = [
    { label: "Select an email type", value: null },
    { label: "Professional", value: "Professional" },
    { label: "Friendly", value: "Friendly" },
    { label: "Direct", value: "Direct" },
  ];

  const audioFileConfig = {
    MP3: {
      audioType: "MP3",
      fileSize: 500,
      startsWith: ".mp3",
    },
    WAV: {
      audioType: "WAV",
      fileSize: 500,
      startsWith: ".wav",
    },
    M4A: {
      audioType: "M4A",
      fileSize: 500,
      startsWith: ".m4a",
    },
  } as const;

  const audioTool = audioFileConfig[audioId as keyof typeof audioFileConfig];

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.name.endsWith(audioTool.startsWith);
      const fileSize = file?.size;
      if (fileSize > audioTool.fileSize) {
        toast.add({
          title: "File is too large",
          type: "error",
        });
      }
      setFile(file);
    }
  };

  const calculateTotalCredits = () => {};

  return (
    <div className="bg-[#060D1A] font-sans w-full h-screen overflow-y-auto pt-5">
      {/* Form Container */}
      <div className="flex flex-col place-self-center mx-auto justify-center">
        <Link
          href="/dashboard"
          className="text-[#7F848D] text-sm hover:text-white transition-all duration-300 ease-in-out pb-5 w-[20%]"
        >
          ← Back to Dashboard
        </Link>
        <div>
          <div className="flex flex-row pr-7 gap-x-2">
            {/* Mic container */}
            <div className="p-2 bg-[#08253C] border-2 border-[#073E5C] w-[6%] rounded-full flex justify-center place-self-center">
              <Mic className="text-[#00B2F9]" />
            </div>
            {/* Text container */}
            <div className="flex justify-center flex-col">
              <h1 className="text-white font-bold text-xl">New Session</h1>
              <p className="text-[#828B97]">
                Upload a client call and we'll transcribe it, extract the scope,
                and draft the recap.
              </p>
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
                Recording
              </FieldLabel>
              <FieldLabel className="text-[#7F848D] text-sm">
                MP3, WAV or M4A up to 500 MB.
              </FieldLabel>
              <span className="text-[#0D1624]">-</span>
              {/* Form Input */}
              <div className="border border-dashed rounded-2xl hover:border-[#00B2F9] transition-all duration-300 ease-in-out flex flex-col justify-center">
                <FieldSet>
                  <FieldGroup>
                    <Input
                      onChange={() => {
                        handleFileInput;
                      }}
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
                    Session details
                  </FieldLabel>
                  <div className="flex flex-row justify-center gap-x-4">
                    <Field>
                      <FieldLabel id="session-name" className="text-[#7F848D]">
                        Session Title
                      </FieldLabel>
                      <Input
                        placeholder="Kickoff call -- Acme redesign"
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
                        Client
                      </FieldLabel>
                      <Input
                        id="session-client"
                        placeholder="Acme Inc."
                        type="text"
                        className="bg-[#09101E] border border-[#272C39] rounded-sm p-5 text-white"
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel className="text-[#7F848D]">
                      Context for the model (optional)
                    </FieldLabel>
                    <Textarea
                      className="border border-[#272C39] bg-[#09101E] placeholder:text-[#7F848D] rounded-sm text-white"
                      placeholder="Fixed budget, 6-week timeline, no native mobile work."
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
                    Deliverables
                  </FieldLabel>
                  {/* Settings 1-2 */}
                  <div className="flex flex-row justify-center gap-x-4">
                    <Button
                      type="button"
                      className="border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539]"
                    >
                      <Field>
                        <FieldLabel className="text-white font-bold">
                          Transcript
                        </FieldLabel>
                        <FieldDescription className="text-[#7F848D]">
                          Speaker-labelled, timestamped
                        </FieldDescription>
                      </Field>
                    </Button>
                    <Button
                      type="button"
                      className="border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539]"
                    >
                      <Field>
                        <FieldLabel className="text-white font-bold">
                          Scope document
                        </FieldLabel>
                        <FieldDescription className="text-[#7F848D]">
                          Deliverables, exclusions, assumptions
                        </FieldDescription>
                      </Field>
                    </Button>
                  </div>
                  {/* Settings 3-4 */}
                  <div className="flex flex-row justify-center gap-x-4">
                    <Button
                      type="button"
                      className="border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539]"
                    >
                      <Field>
                        <FieldLabel className="text-white font-bold">
                          Flow Diagram
                        </FieldLabel>
                        <FieldDescription className="text-[#7F848D]">
                          Visual map of the requested system
                        </FieldDescription>
                      </Field>
                    </Button>
                    <Button
                      type="button"
                      className="border border-[#202735] bg-[#0D1624] p-9 w-[45%] hover:border hover:border-[#00B2F9] hover:bg-[#0D1624] active:cursor-pointer active:bg-[#0E2539]"
                    >
                      <Field>
                        <FieldLabel className="text-white font-bold">
                          Follow-up email
                        </FieldLabel>
                        <FieldDescription className="text-[#7F848D]">
                          Ready-to-send recap draft
                        </FieldDescription>
                      </Field>
                    </Button>
                  </div>
                  <FieldLabel className="text-[#7F848D]">Email tone</FieldLabel>
                  <Select items={emailTone}>
                    <SelectTrigger className="bg-[#08111E] w-[30%] hover:border hover:border-[#00B2F9]">
                      <SelectValue className="text-white" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Email Style</SelectLabel>
                        {Object.entries(emailTone).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </FieldSet>
            </div>
            <div>
              <p>Estimated cost</p>
              <Link href="/dashboard">
                <Button>Cancel</Button>
              </Link>
              <Link href="">
                <Button type="submit">Start Session</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSession;
