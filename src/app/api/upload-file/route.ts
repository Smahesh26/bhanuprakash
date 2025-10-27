import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    console.log("🔥 Upload endpoint hit");

    // Check Cloudinary config
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("❌ Missing Cloudinary environment variables");
      return NextResponse.json(
        {
          error: "Server configuration error",
          details: "Missing Cloudinary credentials",
        },
        { status: 500 }
      );
    }

    console.log("✅ Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "SET" : "MISSING",
      api_key: process.env.CLOUDINARY_API_KEY ? "SET" : "MISSING",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING",
    });

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("❌ No file found in request");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("📁 File received:", {
      name: file.name,
      size: file.size,
      type: file.type,
      sizeKB: Math.round(file.size / 1024),
    });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("📤 Starting Cloudinary upload...");

    // Upload to Cloudinary - simple configuration
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto", // Automatically detect file type
          folder: "curriculum-files", // Organize files in a folder
          public_id: `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`, // Safe filename
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("✅ Cloudinary upload success:", {
              url: result?.secure_url,
              public_id: result?.public_id,
              format: result?.format,
              bytes: result?.bytes,
            });
            resolve(result);
          }
        }
      ).end(buffer);
    });

    const result = uploadResponse as any;

    // Return the secure URL
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("💥 Upload API error:", error);
    return NextResponse.json(
      {
        error: "File upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}