import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "stockpilot-product-images";

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

/**
 * Upload a file buffer to S3
 */
export async function uploadToS3(
  fileBuffer: Buffer,
  originalFileName: string,
  mimeType: string
): Promise<UploadResult> {
  try {
    // Generate unique file name using Node.js built-in crypto
    const fileExtension = originalFileName.split(".").pop() || "jpg";
    const uniqueFileName = `products/${crypto.randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: mimeType,
      // Make the file publicly readable
      ACL: "public-read",
    });

    await s3Client.send(command);

    // Construct the public URL
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${uniqueFileName}`;

    return {
      success: true,
      url: publicUrl,
      key: uniqueFileName,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
    };
  }
}

/**
 * Delete a file from S3
 */
export async function deleteFromS3(fileKey: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting from S3:", error);
    return false;
  }
}

/**
 * Get a signed URL for private file access (if needed)
 */
export async function getSignedUrl(fileKey: string): Promise<string | null> {
  try {
    // For now, we're using public URLs
    // This function can be expanded for private file access
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${fileKey}`;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return null;
  }
}

/**
 * Extract the S3 key from a full URL
 */
export function extractS3KeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Remove leading slash
    return urlObj.pathname.substring(1);
  } catch {
    return null;
  }
}

export default s3Client;
