import sharp from "sharp"
import path from "node:path"
import fs from "node:fs"

const dir = path.join(process.cwd(), "public/features/3-els")
const files = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"]

for (const file of files) {
  const src = path.join(dir, file)
  if (!fs.existsSync(src)) {
    console.warn("Skip (not found):", file)
    continue
  }
  const base = path.basename(file, ".png")
  const dest = path.join(dir, `${base}.avif`)
  await sharp(src)
    .avif({ quality: 80 })
    .toFile(dest)
  console.log("Created:", dest)
}
