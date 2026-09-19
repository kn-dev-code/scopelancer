"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/aws/s3";
import { prisma } from "@/lib/betterauth/auth";
import { bodyParser } from "better-auth/react";
import { NextRequest } from "next/server";
import { api } from "@/lib/axios/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export async function getPresignedUrl(input: presignedUrlInput) {
  const validation = presignedUrlSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors }; // Flatten the data allowing cleaner error output
  }

  const { fileName, fileType } = validation.data; // File name and type required for validation data
  const key = `audio-uploads/${Date.now()}-${fileName}`; // Generate the bucket key url

  try {
    // Creating a new bucket
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: key,
      ContentType: fileType,
    });
    // Generating a signature
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });
    return { success: true, uploadUrl, key };
  } catch (e) {
    return { success: false, error: "Could not generate upload URL" };
  }
}

export async function sessionInput(input: sessionApiInput) {
  const validation = sessionApiSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors };
  }
  const data = validation.data;

  // Send data over to FastAPI (AI) w/ Axios

  return {
    success: true,
    message: "Session saved successfully",
    sessionKey: data.clientFileKey,
  };
}
