import { createHash, randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

/** Public URL prefix; image_path values look like "/images/items/12-3f9a0c1b2d4e5f60.webp". */
export const IMAGE_URL_PREFIX = "/images/items/";
export const imageRoot = path.resolve(process.env.IMAGE_ROOT || path.join(process.cwd(), "uploads/items"));
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

const signatures: { ext: string; matches: (b: Buffer) => boolean }[] = [
  { ext: "jpg", matches: b => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: "png", matches: b => b.length > 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { ext: "webp", matches: b => b.length > 12 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP" },
];

/** File extension for a JPEG, PNG or WebP body, judged by its bytes rather than its headers. */
export function imageExtension(body: Buffer): string | null {
  return signatures.find(s => s.matches(body))?.ext ?? null;
}

/**
 * Names are content-addressed, so a replaced image always gets a new URL and
 * clients can cache every file forever.
 */
export async function saveItemImage(itemId: number, body: Buffer): Promise<string | null> {
  const ext = imageExtension(body);
  if (!ext) return null;
  const name = `${itemId}-${createHash("sha256").update(body).digest("hex").slice(0, 16)}.${ext}`;
  await fs.mkdir(imageRoot, { recursive: true });
  const temp = path.join(imageRoot, `.${randomUUID()}.tmp`);
  await fs.writeFile(temp, body);
  await fs.rename(temp, path.join(imageRoot, name));
  return IMAGE_URL_PREFIX + name;
}

function fileFor(imagePath: string | null | undefined): string | null {
  if (!imagePath?.startsWith(IMAGE_URL_PREFIX)) return null;
  const name = imagePath.slice(IMAGE_URL_PREFIX.length);
  return /^[\w.-]+$/.test(name) ? path.join(imageRoot, name) : null;
}

export async function deleteItemImage(imagePath: string | null | undefined) {
  const file = fileFor(imagePath);
  if (file) await fs.rm(file, { force: true });
}

/**
 * Removes files no item points at, e.g. after a store and its items were deleted.
 * Recent files are kept: an upload may have written one after `referenced` was read.
 */
export async function pruneItemImages(referenced: Iterable<string | null>) {
  const keep = new Set([...referenced].map(fileFor).filter(Boolean));
  const names = await fs.readdir(imageRoot).catch(() => [] as string[]);
  const cutoff = Date.now() - 10 * 60 * 1000;
  await Promise.all(names.map(name => path.join(imageRoot, name)).filter(file => !keep.has(file)).map(async file => {
    const stat = await fs.stat(file).catch(() => null);
    if (stat?.isFile() && stat.mtimeMs < cutoff) await fs.rm(file, { force: true });
  }));
}
