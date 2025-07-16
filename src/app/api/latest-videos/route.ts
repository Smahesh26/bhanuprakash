import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const videos = await prisma.latestVideo.findMany({
      orderBy: { createdAt: "desc" }, // Optional: newest first
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch latest videos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, videoUrl, thumbnailUrl } = body;

    const video = await prisma.latestVideo.create({
      data: {
        title,
        videoUrl,
        thumbnailUrl,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}
