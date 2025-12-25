import sharp from 'sharp';

/**
 * Converts PNG or JPG to WebP
 * @param filePath - path to the original file
 * @param outputPath - path to save WebP
 */
export async function convertToWebP(filePath: string, outputPath: string) {
  await sharp(filePath).webp({ quality: 75 }).toFile(outputPath);
}

/**
 * Converts PNG or JPG to AVIF
 * @param filePath - path to the original file
 * @param outputPath - path to save AVIF
 */
export async function convertToAvif(filePath: string, outputPath: string) {
  await sharp(filePath).avif({ quality: 50 }).toFile(outputPath);
}

