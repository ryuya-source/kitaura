#!/usr/bin/env node
/**
 * 絵本v3.0 内の AVIF を「先頭の番号だけ」のファイル名にリネームする。
 * 例: 03-fd73e99f-....avif → 03.avif
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, "..", "public", "srory-book", "絵本v3.0")

const renamings = [
  ["03-fd73e99f-8a75-4ecd-b525-3966269a6375.avif", "03.avif"],
  ["04-c7d48d3d-2cf5-4293-85b1-eded4d621564.avif", "04.avif"],
  ["4.1__2_-64f1167c-44c5-4dd7-9be6-4ca6249372da.avif", "4.1.avif"],
  ["05-2be80df1-b5dc-4fc0-8a0d-d571b675eb90.avif", "05.avif"],
  ["06-dfd5c2e2-7d9e-48cc-ae83-5dc1a2978d37.avif", "06.avif"],
  ["07-78acc76f-451b-4491-87b1-c0874acad825.avif", "07.avif"],
  ["08-eb96a815-0169-42e8-83ab-bfaa33da0d63.avif", "08.avif"],
  ["09-c09bcb79-3842-4644-aac5-5d3a0569559e.avif", "09.avif"],
]

for (const [from, to] of renamings) {
  const fromPath = path.join(dir, from)
  const toPath = path.join(dir, to)
  if (fs.existsSync(fromPath)) {
    if (fs.existsSync(toPath)) fs.unlinkSync(toPath)
    fs.renameSync(fromPath, toPath)
    console.log(`${from} → ${to}`)
  } else {
    console.warn("スキップ（なし）:", from)
  }
}
console.log("完了")
