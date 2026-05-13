import { type NextRequest, NextResponse } from "next/server"
import { get } from "@vercel/blob"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Serve images from private blob storage
export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.searchParams.get("path")

    if (!pathname) {
      return new NextResponse("Missing path", { status: 400 })
    }

    const result = await get(pathname, {
      access: "private",
      ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
    })

    if (!result) {
      return new NextResponse("Not found", { status: 404 })
    }

    // Handle 304 Not Modified
    if (result.statusCode === 304) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          ETag: result.blob.etag,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      })
    }

    // Stream the image with caching headers
    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType,
        ETag: result.blob.etag,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Image serve error:", error)
    return new NextResponse("Failed to serve image", { status: 500 })
  }
}
