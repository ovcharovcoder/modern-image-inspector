import sharp from 'sharp';

/**
 * Конвертує PNG або JPG у WebP
 * @param filePath - шлях до оригінального файлу
 * @param outputPath - шлях для збереження WebP
 */
export async function convertToWebP(filePath: string, outputPath: string) {
  await sharp(filePath).webp({ quality: 75 }).toFile(outputPath);
}

/**
 * Конвертує PNG або JPG у AVIF
 * @param filePath - шлях до оригінального файлу
 * @param outputPath - шлях для збереження AVIF
 */
export async function convertToAvif(filePath: string, outputPath: string) {
  await sharp(filePath).avif({ quality: 50 }).toFile(outputPath);
}
