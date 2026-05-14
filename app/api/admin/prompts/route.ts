import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get("x-admin-password")
  const adminPassword = process.env.ADMIN_PASSWORD
  return authHeader === adminPassword
}

// GET - Fetch all prompts
export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: prompts, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching prompts:", error)
      return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 })
    }

    return NextResponse.json({ prompts })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 })
  }
}

// POST - Create a new prompt
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { category, image_url, title, prompt, sort_order } = await request.json()

    if (!category || !image_url || !title || !prompt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("gallery_images")
      .insert({
        category,
        image_url,
        title,
        prompt,
        sort_order: sort_order || 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating prompt:", error)
      return NextResponse.json({ error: "Failed to create prompt" }, { status: 500 })
    }

    return NextResponse.json({ prompt: data })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to create prompt" }, { status: 500 })
  }
}

// PUT - Update a prompt
export async function PUT(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, category, image_url, title, prompt, sort_order } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Prompt ID required" }, { status: 400 })
    }

    const supabase = await createClient()

    const updateData: Record<string, unknown> = {}
    if (category !== undefined) updateData.category = category
    if (image_url !== undefined) updateData.image_url = image_url
    if (title !== undefined) updateData.title = title
    if (prompt !== undefined) updateData.prompt = prompt
    if (sort_order !== undefined) updateData.sort_order = sort_order

    const { data, error } = await supabase
      .from("gallery_images")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating prompt:", error)
      return NextResponse.json({ error: "Failed to update prompt" }, { status: 500 })
    }

    return NextResponse.json({ prompt: data })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to update prompt" }, { status: 500 })
  }
}

// DELETE - Delete a prompt
export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      console.log("[v0] DELETE unauthorized - auth header:", request.headers.get("x-admin-password")?.substring(0, 3) + "...")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    console.log("[v0] DELETE request for id:", id)

    if (!id) {
      return NextResponse.json({ error: "Prompt ID required" }, { status: 400 })
    }

    const supabase = await createClient()

    // First check if the record exists
    const { data: existing, error: findError } = await supabase
      .from("gallery_images")
      .select("id")
      .eq("id", id)
      .single()

    console.log("[v0] Found existing record:", existing, "Error:", findError)

    const { error, count } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id)

    console.log("[v0] Delete result - error:", error, "count:", count)

    if (error) {
      console.error("Error deleting prompt:", error)
      return NextResponse.json({ error: "Failed to delete prompt: " + error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to delete prompt" }, { status: 500 })
  }
}
