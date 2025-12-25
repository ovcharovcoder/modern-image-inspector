import sharp from 'sharp';

export async function saveAsWebP(buffer: Buffer, path: string) {
  await sharp(buffer).webp({ quality: 75 }).toFile(path);
}

export async function saveAsAvif(buffer: Buffer, path: string) {
  await sharp(buffer).avif({ quality: 50 }).toFile(path);
}
