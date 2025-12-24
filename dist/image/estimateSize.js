"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateWebPSave = estimateWebPSave;
exports.estimateAvifSave = estimateAvifSave;
const sharp_1 = __importDefault(require("sharp"));
async function estimateWebPSave(buffer) {
    const webpBuffer = await (0, sharp_1.default)(buffer).webp({ quality: 75 }).toBuffer();
    const sizeKB = (webpBuffer.length / 1024).toFixed(2);
    return { buffer: webpBuffer, sizeKB };
}
async function estimateAvifSave(buffer) {
    const avifBuffer = await (0, sharp_1.default)(buffer).avif({ quality: 50 }).toBuffer();
    const sizeKB = (avifBuffer.length / 1024).toFixed(2);
    return { buffer: avifBuffer, sizeKB };
}
