#!/usr/bin/env node
/**
 * 指定フォルダ内の画像を AVIF に変換する。
 * 使い方: node images-to-avif.mjs <フォルダパス>
 * 例: node images-to-avif.mjs "/Users/ishikawatatsuya/Desktop/画像/北浦/採用"
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EXT_IMAGE = /\.(png|jpe?g|webp|gif|tiff?|bmp|heic)$/i;
const dir = process.argv[2];

if (!dir) {
  console.error("使い方: node images-to-avif.mjs <フォルダパス>");
  console.error('例: node images-to-avif.mjs "/Users/ishikawatatsuya/Desktop/画像/北浦/採用"');
  process.exit(1);
}

if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
  console.error("エラー: フォルダが見つかりません:", dir);
  process.exit(1);
}

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (e) {
  console.error("sharp をインストールしてください: npm install sharp");
  process.exit(1);
}

let heicConvert;
try {
  heicConvert = (await import("heic-convert")).default;
} catch (e) {
  heicConvert = null;
}

const isHeic = (f) => /\.heic$/i.test(f);
const files = fs.readdirSync(dir).filter((f) => EXT_IMAGE.test(f));
if (files.length === 0) {
  console.log("変換対象の画像がありません:", dir);
  process.exit(0);
}

const outDir = path.join(dir, "avif");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
console.log(`変換対象: ${files.length} 件 → ${outDir}`);

for (const file of files) {
  const inputPath = path.join(dir, file);
  const base = path.basename(file, path.extname(file));
  const outputPath = path.join(outDir, `${base}.avif`);
  try {
    let input;
    if (isHeic(file) && heicConvert) {
      const buffer = fs.readFileSync(inputPath);
      const pngBuffer = await heicConvert({ buffer, format: "PNG" });
      input = sharp(pngBuffer);
    } else if (isHeic(file)) {
      console.error("失敗:", file, "HEIC変換には heic-convert が必要です。npm install heic-convert を実行してください。");
      continue;
    } else {
      input = sharp(inputPath);
    }
    await input.avif({ quality: 80 }).toFile(outputPath);
    console.log("OK:", file, "->", `${base}.avif`);
  } catch (err) {
    console.error("失敗:", file, err.message);
  }
}

console.log("完了");
