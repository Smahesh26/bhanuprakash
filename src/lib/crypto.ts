import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const KEY_RAW = (process.env.ENCRYPTION_KEY || "").slice(0, 32);

export function decrypt(text: string): string {
  if (!text) return "";
  if (!KEY_RAW || KEY_RAW.length !== 32) {
    // If no proper key is configured, return the input as-is to avoid breaking runtime
    return text;
  }
  const parts = text.split(":");
  const iv = Buffer.from(parts.shift()!, "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY_RAW), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
