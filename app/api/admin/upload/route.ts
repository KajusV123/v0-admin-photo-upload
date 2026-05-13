import { NextRequest, NextResponse } from "next/server"
import { put, del } from "@vercel/blob"

// Configure route to handle large file uploads
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ADMIN_COOKIE_NAME = "admin_session"

function isAuthenticated(request: NextRequest): boolean {
  // Use NextRequest's built-in cookies API which properly parses cookies
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  console.log("[v0] Cookie value:", sessionCookie?.value)
  return sessionCookie?.value === "authenticated"
}

// POST - Upload an image
export async function POST(request: NextRequest) {
  console.log("[v0] Upload route called")
  
  try {
    // Check authentication from request cookies
    const isAuth = isAuthenticated(request)
    console.log("[v0] Auth check result:", isAuth)
    
    if (!isAuth) {
      console.log("[v0] Upload rejected: Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if BLOB token exists
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN
    console.log("[v0] BLOB_READ_WRITE_TOKEN exists:", hasBlobToken)
    
    if (!hasBlobToken) {
      console.log("[v0] Upload rejected: No BLOB token")
      return NextResponse.json({ error: "Blob storage not configured. Please add Vercel Blob integration." }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.log("[v0] Upload rejected: No file")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("[v0] File received:", file.name, file.type, file.size)

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      console.log("[v0] Upload rejected: Invalid type:", file.type)
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      console.log("[v0] Upload rejected: File too large:", file.size)
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB" },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split(".").pop() || "jpg"
    const filename = `prompts/${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`
    
    console.log("[v0] Uploading to blob with filename:", filename)

    // Upload to Vercel Blob with public access
    const blob = await put(filename, file, {
      access: "public",
    })

    console.log("[v0] Blob upload success:", blob.url)
    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    const errorMessage = error instanceof Error ? error.message : "Upload failed"
    console.error("[v0] Error message:", errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// DELETE - Delete an image from blob storage
export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { url } = await request.json()

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
