import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL

function getR2Client() {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error("R2 credentials not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY environment variables.")
  }
  
  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  })
}

export async function uploadToR2(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  if (!R2_BUCKET_NAME) {
    throw new Error("R2_BUCKET_NAME not configured")
  }
  if (!R2_PUBLIC_URL) {
    throw new Error("R2_PUBLIC_URL not configured")
  }

  const r2Client = getR2Client()
  const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_")
  const key = `prompts/${Date.now()}-${Math.random().toString(36).substring(7)}-${safeFilename}`

  console.log("[v0] R2 upload starting - bucket:", R2_BUCKET_NAME, "key:", key)

  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: contentType,
      })
    )
    console.log("[v0] R2 upload complete")
  } catch (err) {
    console.error("[v0] R2 upload failed:", err)
    // Re-throw with more helpful message
    if (err instanceof Error) {
      throw new Error(`R2 upload failed: ${err.message}`)
    }
    throw err
  }

  // Return the public URL
  return `${R2_PUBLIC_URL}/${key}`
}

export async function deleteFromR2(url: string): Promise<void> {
  if (!R2_BUCKET_NAME || !R2_PUBLIC_URL) {
    throw new Error("R2 configuration incomplete")
  }

  const r2Client = getR2Client()
  // Extract the key from the URL
  const key = url.replace(`${R2_PUBLIC_URL}/`, "")

  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })
  )
}
