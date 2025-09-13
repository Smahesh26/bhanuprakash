import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const items = await prisma.banner.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/instructor/banner error:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.videoUrl) {
      return NextResponse.json({ error: "title and videoUrl required" }, { status: 400 });
    }
    const created = await prisma.banner.create({
      data: {
        title: body.title,
        subtitle: body.subtitle || null,
        videoUrl: body.videoUrl,
        posterUrl: body.posterUrl || null,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/instructor/banner error:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  if (!id) return NextResponse.json({ error: "No id" }, { status: 400 });
  const updated = await prisma.banner.update({
    where: { id },
    data: {
      title: body.title,
      subtitle: body.subtitle,
      videoUrl: body.videoUrl,
      posterUrl: body.posterUrl,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await prisma.banner.delete({ where: { id } });
    return NextResponse.json({ message: "deleted" });
  } catch (error) {
    console.error("DELETE /api/instructor/banner error:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}