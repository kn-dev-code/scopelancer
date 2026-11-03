"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/aws/s3";
import { api } from "@/lib/axios/api";
import {
  presignedUrlInput,
  presignedUrlSchema,
  sessionApiInput,
  sessionApiSchema,
} from "@/lib/audio/audio";

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
  const sessionData = validation.data;

  // Send data over to FastAPI (AI) w/ Axios
  const response = await api.post("/file/file-conversion", sessionData);

  return {
    success: true,
    message: "Session saved successfully",
    sessionKey: sessionData.clientFileKey,
  };
}
