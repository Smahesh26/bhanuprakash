import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "curriculum" },
      (error, result) => error ? reject(error) : resolve(result)
    ).end(buffer);
  });

  // @ts-ignore
  return NextResponse.json({ url: result.secure_url });
}