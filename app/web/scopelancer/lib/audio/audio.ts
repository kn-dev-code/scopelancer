import { z } from "zod";
import { Deliverables, EmailType } from "@/lib/generated/client";

const ACCEPTED_AUDIO_TYPES = [
  "audio/mp4",
  "audio/mp3",
  "audio/m4a",
  "audio/wav",
];

const MAX_FILE_SIZE_MB = 25 * 1024 * 1024;

export const presignedUrlSchema = z.object({
  fileName: z.string().min(1, "File name required"),
  fileType: z
    .string()
    .refine((fileType) => ACCEPTED_AUDIO_TYPES.includes(fileType), {
      message: "Only audio files are allowed",
    }),
  fileSize: z.number().max(MAX_FILE_SIZE_MB, "File size must be under 25 MB"),
});

export const sessionApiSchema = z.object({
  clientFileKey: z.string(),
  sessionTitle: z.string(),
  client: z.string().min(1),
  context: z.string().optional(),
  deliverables: z.array(z.nativeEnum(Deliverables)).optional(),
  emailType: z.nativeEnum(EmailType).optional(),
});

export type presignedUrlInput = z.infer<typeof presignedUrlSchema>; // Presigned type input
export type sessionApiInput = z.infer<typeof sessionApiSchema>; // Session type input
