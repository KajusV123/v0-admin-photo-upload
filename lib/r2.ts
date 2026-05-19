import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

function getR2Config() {
  const config = {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME,
    publicUrl: process.env.R2_PUBLIC_URL,
  }
  
  console.log("[v0] R2 Config check - accountId:", !!config.accountId, "accessKeyId:", !!config.accessKeyId, "secretAccessKey:", !!config.secretAccessKey, "bucketName:", config.bucketName, "publicUrl:", !!config.publicUrl)
  
  return config
}

function createR2Client() {
  const { accountId, accessKeyId, secretAccessKey } = getR2Config()
  
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 credentials not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY environment variables.")
  }
  
  const endpoint = `https://${accountId}.r2.cloudflarestorage.com`
  console.log("[v0] Creating R2 client with endpoint:", endpoint)
  
  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}

export async function uploadToR2(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const { bucketName, publicUrl } = getR2Config()
  
  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME not configured")
  }
  if (!publicUrl) {
    throw new Error("R2_PUBLIC_URL not configured")
  }

  const r2Client = createR2Client()
  const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_")
  const key = `prompts/${Date.now()}-${Math.random().toString(36).substring(7)}-${safeFilename}`

  console.log("[v0] R2 upload starting - bucket:", bucketName, "key:", key)

  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: contentType,
      })
    )
    console.log("[v0] R2 upload complete - URL:", `${publicUrl}/${key}`)
  } catch (err: unknown) {
    console.error("[v0] R2 upload failed:", err)
    if (err instanceof Error) {
      throw new Error(`R2 upload failed: ${err.message}`)
    }
    throw new Error("R2 upload failed: Unknown error")
  }

  return `${publicUrl}/${key}`
}

export async function deleteFromR2(url: string): Promise<void> {
  const { bucketName, publicUrl } = getR2Config()
  
  if (!bucketName || !publicUrl) {
    throw new Error("R2 configuration incomplete")
  }

  const r2Client = createR2Client()
  const key = url.replace(`${publicUrl}/`, "")

  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  )
}
