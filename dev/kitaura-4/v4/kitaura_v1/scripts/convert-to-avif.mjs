#!/usr/bin/env node
/**
 * public/srory-book 内の PNG を AVIF に変換
 */
import sharp from "sharp"
import { readdir, stat } from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const inputDir = join(__dirname, "../public/srory-book")

async function main() {
  const files = await readdir(inputDir)
  const pngFiles = files.filter((f) => f.toLowerCase().endsWith(".png"))

  if (pngFiles.length === 0) {
    console.log("PNG ファイルが見つかりません")
    return
  }

  for (const file of pngFiles) {
    const inputPath = join(inputDir, file)
    const base = file.replace(/\.png$/i, "")
    const outputPath = join(inputDir, `${base}.avif`)

    const statIn = await stat(inputPath)
    await sharp(inputPath)
      .avif({ quality: 80, effort: 4 })
      .toFile(outputPath)

    const statOut = await stat(outputPath)
    const saved = ((1 - statOut.size / statIn.size) * 100).toFixed(1)
    console.log(`${file} → ${base}.avif (${(statOut.size / 1024).toFixed(0)}KB, ${saved}% 削減)`)
  }

  console.log(`\n完了: ${pngFiles.length} 件を AVIF に変換`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
