import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
// GET: Fetch all banners
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

// POST: Create a new banner
export async function POST(req: NextRequest) {
  try {
    const { heading, subheading, buttonText, buttonLink, youtubeUrl } = await req.json();
    if (!heading || !subheading || !buttonText || !youtubeUrl) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }
    const banner = await prisma.banner.create({
      data: { heading, subheading, buttonText, buttonLink, youtubeUrl },
    });
    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}

// PUT: Update a banner
export async function PUT(req: NextRequest) {
  try {
    const { id, heading, subheading, buttonText, buttonLink, youtubeUrl } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const banner = await prisma.banner.update({
      where: { id: Number(id) },
      data: { heading, subheading, buttonText, buttonLink, youtubeUrl },
    });
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update banner" }, { status: 500 });
  }
}

// DELETE: Delete a banner
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await prisma.banner.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete banner" }, { status: 500 });
  }
}