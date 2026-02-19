#!/usr/bin/env node
/**
 * public 内の全画像を再帰的に AVIF に変換
 * 除外: アイコン・favicon (icon-*, apple-icon)
 */
import sharp from "sharp"
import { stat } from "node:fs/promises"
import { readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "../public")

const SKIP_PATTERNS = [
  /^icon-/i,
  /^apple-icon/i,
  /\.avif$/i,
]

function shouldSkip(filePath) {
  const name = filePath.split("/").pop()
  return SKIP_PATTERNS.some((p) => p.test(name))
}

function findImages(dir, base = "") {
  const results = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      results.push(...findImages(full, rel))
    } else if (/\.(png|jpe?g|webp|gif)$/i.test(e.name) && !shouldSkip(full)) {
      results.push({ full, rel, base: e.name.replace(/\.[^.]+$/i, "") })
    }
  }
  return results
}

async function main() {
  const images = findImages(publicDir)

  if (images.length === 0) {
    console.log("変換対象の画像がありません")
    return
  }

  console.log(`${images.length} 件の画像を AVIF に変換します...`)

  let totalIn = 0
  let totalOut = 0

  for (const { full, rel, base } of images) {
    const dir = dirname(full)
    const outputPath = join(dir, `${base}.avif`)

    const statIn = await stat(full)
    totalIn += statIn.size

    await sharp(full)
      .avif({ quality: 80, effort: 4 })
      .toFile(outputPath)

    const statOut = await stat(outputPath)
    totalOut += statOut.size
    const saved = ((1 - statOut.size / statIn.size) * 100).toFixed(0)
    console.log(`${rel} → ${base}.avif (-${saved}%)`)
  }

  const totalSaved = ((1 - totalOut / totalIn) * 100).toFixed(1)
  console.log(`\n完了: ${images.length} 件 (合計 ${(totalIn / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB, ${totalSaved}% 削減)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
