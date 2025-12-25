import sharp from 'sharp';
import * as fs from 'fs';

export async function analyzeImage(filePath: string) {
  const img = sharp(filePath);
  const meta = await img.metadata();

  // Фактичний розмір файлу у байтах
  const stats = fs.statSync(filePath);
  const sizeKB = stats.size / 1024;

  return {
    width: meta.width ?? 0, // якщо undefined, ставимо 0
    height: meta.height ?? 0, // якщо undefined, ставимо 0
    format: meta.format?.toUpperCase() || 'UNKNOWN',
    sizeKB, // число, а не рядок
    hasAlpha: meta.hasAlpha ?? false,
    colorSpace: meta.space || 'unknown',
  };
}
