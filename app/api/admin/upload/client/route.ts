import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = (await request.json()) as HandleUploadBody
  const adminPassword = process.env.ADMIN_PASSWORD

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Check auth from clientPayload
        if (clientPayload) {
          try {
            const payload = JSON.parse(clientPayload)
            if (!adminPassword || payload.auth !== adminPassword) {
              throw new Error("Unauthorized")
            }
          } catch {
            throw new Error("Unauthorized")
          }
        } else {
          throw new Error("Unauthorized")
        }

        // Validate file type from pathname
        const extension = pathname.split(".").pop()?.toLowerCase()
        const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif"]
        
        if (!extension || !allowedExtensions.includes(extension)) {
          throw new Error("Invalid file type. Allowed: JPEG, PNG, WebP, GIF")
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
          maximumSizeInBytes: 30 * 1024 * 1024, // 30MB
          tokenPayload: JSON.stringify({}),
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload completed:", blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("Client upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    )
  }
}
