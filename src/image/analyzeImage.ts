import sharp from 'sharp';
import * as fs from 'fs';

export async function analyzeImage(filePath: string) {
  const img = sharp(filePath);
  const meta = await img.metadata();

  // Фактичний розмір файлу у байтах
  const stats = fs.statSync(filePath);
  const sizeKB = (stats.size / 1024).toFixed(2);

  return {
    width: meta.width,
    height: meta.height,
    format: meta.format?.toUpperCase() || 'UNKNOWN',
    sizeKB, // Цей параметр передаємо у Webview
    hasAlpha: meta.hasAlpha,
    colorSpace: meta.space,
  };
}
