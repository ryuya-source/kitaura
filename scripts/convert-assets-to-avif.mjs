#!/usr/bin/env node
/**
 * Cursor の assets に保存された 11 枚の PNG を AVIF に変換し、
 * ワークスペースの 絵本-avif フォルダに出力する。
 * 実行: cd タスク管理/scripts && node convert-assets-to-avif.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE = path.resolve(__dirname, "..");
const ASSETS = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(
      process.env.HOME || "",
      ".cursor", "projects", "Users-ishikawatatsuya-Desktop", "assets"
    );
const OUT_DIR = path.join(WORKSPACE, "絵本-avif");

const ASSET_FILES = [
  "0-8833efd0-d410-4059-bb1c-fe1529dbcad6.png",
  "01-ebb0bf6b-5620-468a-8c42-42abc2900d88.png",
  "01__2_-64f1167c-44c5-4dd7-9be6-4ca6249372da.png",
  "02-4160d76e-c70d-4ab9-bf54-f91128ee6aea.png",
  "03-fd73e99f-8a75-4ecd-b525-3966269a6375.png",
  "04-c7d48d3d-2cf5-4293-85b1-eded4d621564.png",
  "05-2be80df1-b5dc-4fc0-8a0d-d571b675eb90.png",
  "06-dfd5c2e2-7d9e-48cc-ae83-5dc1a2978d37.png",
  "07-78acc76f-451b-4491-87b1-c0874acad825.png",
  "08-eb96a815-0169-42e8-83ab-bfaa33da0d63.png",
  "09-c09bcb79-3842-4644-aac5-5d3a0569559e.png",
];

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (e) {
  console.error("sharp をインストールしてください: cd scripts && npm install sharp");
  process.exit(1);
}

if (!fs.existsSync(ASSETS)) {
  console.error("assets フォルダが見つかりません:", ASSETS);
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
console.log("出力先:", OUT_DIR);

let ok = 0;
let fail = 0;
for (const file of ASSET_FILES) {
  const inputPath = path.join(ASSETS, file);
  const base = path.basename(file, path.extname(file));
  const outputPath = path.join(OUT_DIR, `${base}.avif`);
  if (!fs.existsSync(inputPath)) {
    console.error("スキップ（ファイルなし）:", file);
    fail++;
    continue;
  }
  try {
    await sharp(inputPath).avif({ quality: 80 }).toFile(outputPath);
    console.log("OK:", file, "->", `${base}.avif`);
    ok++;
  } catch (err) {
    console.error("失敗:", file, err.message);
    fail++;
  }
}

console.log("完了:", ok, "件成功", fail ? `, ${fail} 件失敗` : "");
