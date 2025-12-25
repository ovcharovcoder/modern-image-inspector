import sharp from 'sharp';

/**
 * Estimates file size after converting to WebP
 * @param buffer - original image buffer
 * @returns size in KB
 */
export async function estimateWebPSize(buffer: Buffer): Promise<number> {
  const data = await sharp(buffer).webp({ quality: 75 }).toBuffer();
  return +(data.length / 1024).toFixed(2);
}

/**
 * Estimates file size after conversion to AVIF
 * @param buffer - original image buffer
 * @returns size in KB
 */
export async function estimateAvifSize(buffer: Buffer): Promise<number> {
  const data = await sharp(buffer).avif({ quality: 50 }).toBuffer();
  return +(data.length / 1024).toFixed(2);
}

