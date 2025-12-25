import sharp from 'sharp';

/**
 * Оцінює розмір файлу після конвертації у WebP
 * @param buffer - буфер оригінального зображення
 * @returns розмір у KB
 */
export async function estimateWebPSize(buffer: Buffer): Promise<number> {
  const data = await sharp(buffer).webp({ quality: 75 }).toBuffer();
  return +(data.length / 1024).toFixed(2);
}

/**
 * Оцінює розмір файлу після конвертації у AVIF
 * @param buffer - буфер оригінального зображення
 * @returns розмір у KB
 */
export async function estimateAvifSize(buffer: Buffer): Promise<number> {
  const data = await sharp(buffer).avif({ quality: 50 }).toBuffer();
  return +(data.length / 1024).toFixed(2);
}
