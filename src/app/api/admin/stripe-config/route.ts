import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import crypto from "crypto";

// Encryption setup
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-32-char-secret-key-change-this-in-production!"; // Must be 32 chars
const ALGORITHM = "aes-256-cbc";

// Encrypt sensitive data
function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY.slice(0, 32)), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

// Decrypt sensitive data
function decrypt(text: string): string {
  const parts = text.split(":");
  const iv = Buffer.from(parts.shift()!, "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY.slice(0, 32)), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// GET - Retrieve Stripe configuration
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user || (session.user as any).role !== "instructor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const config = await prisma.stripeConfig.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!config) {
      return NextResponse.json({
        stripePublishableKey: "",
        stripeSecretKey: "",
        stripeWebhookSecret: "",
      });
    }

    // Decrypt sensitive keys before sending
    return NextResponse.json({
      stripePublishableKey: config.publishableKey,
      stripeSecretKey: config.secretKey ? decrypt(config.secretKey) : "",
      stripeWebhookSecret: config.webhookSecret ? decrypt(config.webhookSecret) : "",
    });
  } catch (err) {
    console.error("Error fetching Stripe config:", err);
    return NextResponse.json({ error: "Failed to fetch configuration" }, { status: 500 });
  }
}

// POST - Save Stripe configuration
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user || (session.user as any).role !== "instructor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { stripePublishableKey, stripeSecretKey, stripeWebhookSecret } = body;

    if (!stripePublishableKey || !stripeSecretKey) {
      return NextResponse.json(
        { error: "Publishable key and Secret key are required" },
        { status: 400 }
      );
    }

    // Encrypt sensitive keys
    const encryptedSecretKey = encrypt(stripeSecretKey);
    const encryptedWebhookSecret = stripeWebhookSecret ? encrypt(stripeWebhookSecret) : null;

    // Check if config already exists
    const existingConfig = await prisma.stripeConfig.findFirst();

    if (existingConfig) {
      // Update existing config
      await prisma.stripeConfig.update({
        where: { id: existingConfig.id },
        data: {
          publishableKey: stripePublishableKey,
          secretKey: encryptedSecretKey,
          webhookSecret: encryptedWebhookSecret,
          isActive: true,
        },
      });
    } else {
      // Create new config
      await prisma.stripeConfig.create({
        data: {
          publishableKey: stripePublishableKey,
          secretKey: encryptedSecretKey,
          webhookSecret: encryptedWebhookSecret,
          isActive: true,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Configuration saved successfully" });
  } catch (err) {
    console.error("Error saving Stripe config:", err);
    return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
  }
}
