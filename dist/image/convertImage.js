"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAsWebP = saveAsWebP;
exports.saveAsAvif = saveAsAvif;
const sharp_1 = __importDefault(require("sharp"));
async function saveAsWebP(buffer, path) {
    await (0, sharp_1.default)(buffer).webp({ quality: 75 }).toFile(path);
}
async function saveAsAvif(buffer, path) {
    await (0, sharp_1.default)(buffer).avif({ quality: 50 }).toFile(path);
}
