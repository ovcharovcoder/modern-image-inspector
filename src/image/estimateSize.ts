import sharp from 'sharp';

export async function estimateWebPSave(buffer: Buffer) {
  const webpBuffer = await sharp(buffer).webp({ quality: 75 }).toBuffer();
  const sizeKB = (webpBuffer.length / 1024).toFixed(2);
  return { buffer: webpBuffer, sizeKB };
}

export async function estimateAvifSave(buffer: Buffer) {
  const avifBuffer = await sharp(buffer).avif({ quality: 50 }).toBuffer();
  const sizeKB = (avifBuffer.length / 1024).toFixed(2);
  return { buffer: avifBuffer, sizeKB };
}
