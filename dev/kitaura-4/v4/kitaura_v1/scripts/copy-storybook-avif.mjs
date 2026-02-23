#!/usr/bin/env node
/**
 * 絵本v3.0 用の AVIF を public/srory-book/絵本v3.0/ に 01.avif ～ 11.avif としてコピーする。
 * 使い方: node copy-storybook-avif.mjs [AVIFが入ったフォルダのパス]
 * 例: node copy-storybook-avif.mjs ../../絵本-avif
 * 例: node copy-storybook-avif.mjs /Users/xxx/Downloads/絵本v3.0/avif
 *
 * ソースフォルダ内の .avif を次の順で並べたものを 01.avif … 11.avif としてコピーする:
 * 0, 01, 01__2_, 02, 03, 04, 05, 06, 07, 08, 09（ファイル名の先頭で判定）
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")
const destDir = path.join(projectRoot, "public", "srory-book", "絵本v3.0")

/** ファイル名の先頭がこの順になるよう並べる（01__2_ は 01 より後） */
const PREFIX_ORDER = [
  "0-",
  "01-",
  "01__2_-",
  "02-",
  "03-",
  "04-",
  "05-",
  "06-",
  "07-",
  "08-",
  "09-",
]

const sourceDir = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(projectRoot, "..", "..", "絵本-avif")

if (!fs.existsSync(sourceDir)) {
  console.error("ソースフォルダが見つかりません:", sourceDir)
  console.error("使い方: node copy-storybook-avif.mjs [AVIFが入ったフォルダのパス]")
  process.exit(1)
}

const files = fs.readdirSync(sourceDir).filter((f) => f.toLowerCase().endsWith(".avif"))
if (files.length === 0) {
  console.error("ソースフォルダに .avif がありません:", sourceDir)
  process.exit(1)
}

/** ファイル名がどのプレフィックスに該当するか（0-based index） */
function getOrderIndex(filename) {
  const i = PREFIX_ORDER.findIndex((p) => filename.startsWith(p))
  return i >= 0 ? i : 999
}

const sorted = [...files].sort((a, b) => getOrderIndex(a) - getOrderIndex(b))

if (sorted.length < 11) {
  console.warn(
    `警告: 11 件想定ですが ${sorted.length} 件の .avif のみ見つかりました。不足分はスキップします。`
  )
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

const toCopy = sorted.slice(0, 11)
for (let i = 0; i < toCopy.length; i++) {
  const outName = `${String(i + 1).padStart(2, "0")}.avif`
  const srcPath = path.join(sourceDir, toCopy[i])
  const destPath = path.join(destDir, outName)
  fs.copyFileSync(srcPath, destPath)
  console.log(`${toCopy[i]} → ${outName}`)
}

console.log(`\n完了: ${toCopy.length} 件を ${destDir} にコピーしました。`)
