import { NextRequest, NextResponse } from "next/server"
import { uploadToR2, deleteFromR2 } from "@/lib/r2"

// Configure route to handle file uploads
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Simple auth check - verify admin password is sent with request
function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD
}

// POST - Upload an image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const authToken = formData.get("auth") as string || request.headers.get("x-admin-password")

    // Verify auth token matches admin password
    const adminPassword = getAdminPassword()
    if (!adminPassword || authToken !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      )
    }

    // Validate file size (max 700KB)
    const maxSize = 700 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 700KB. Please compress your image first." },
        { status: 400 }
      )
    }

    // Convert file to buffer and upload to R2
    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadToR2(buffer, file.name, file.type)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Upload error:", error)
    const errorMessage = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// DELETE - Delete an image from R2 storage
export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json()
    const authToken = request.headers.get("x-admin-password")

    // Verify auth token
    const adminPassword = getAdminPassword()
    if (!adminPassword || authToken !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    await deleteFromR2(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
