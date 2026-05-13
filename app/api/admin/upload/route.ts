import { NextRequest, NextResponse } from "next/server"
import { put, del } from "@vercel/blob"

// Configure route to handle file uploads
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Simple auth check - verify admin password is sent with request
// This bypasses cookie issues with FormData uploads
function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD
}

// POST - Upload an image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const authToken = formData.get("auth") as string

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

    // Validate file size (max 4.5MB for serverless)
    const maxSize = 4.5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 4.5MB" },
        { status: 400 }
      )
    }

    // Check if BLOB token exists
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Blob storage not configured" },
        { status: 500 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split(".").pop() || "jpg"
    const filename = `prompts/${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`

    // Upload to Vercel Blob (private store)
    const blob = await put(filename, file, {
      access: "private",
    })

    // Return the pathname for use with delivery route
    return NextResponse.json({ 
      url: `/api/image?path=${encodeURIComponent(blob.pathname)}`,
      pathname: blob.pathname 
    })
  } catch (error) {
    console.error("Upload error:", error)
    const errorMessage = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// DELETE - Delete an image from blob storage
export async function DELETE(request: NextRequest) {
  try {
    const { url, auth } = await request.json()

    // Verify auth token
    const adminPassword = getAdminPassword()
    if (!adminPassword || auth !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
