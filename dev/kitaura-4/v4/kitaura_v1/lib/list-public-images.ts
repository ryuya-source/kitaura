import fs from "node:fs"
import path from "node:path"

export function listPublicImages(
  relativeDir: string,
  options?: { cacheBust?: boolean; extensions?: string[]; sortNumeric?: boolean }
): string[] {
  const dirPath = path.join(process.cwd(), "public", ...relativeDir.split("/"))
  if (!fs.existsSync(dirPath)) return []
  const exts = options?.extensions ?? ["avif"]
  const pattern = new RegExp(`\\.(${exts.join("|")})$`, "i")

  return fs
    .readdirSync(dirPath)
    .filter((name) => pattern.test(name))
    .sort((a, b) =>
      options?.sortNumeric
        ? a.localeCompare(b, undefined, { numeric: true })
        : a.localeCompare(b, "ja")
    )
    .map((name) => {
      const base = `/${relativeDir}/${name}`
      if (options?.cacheBust) {
        try {
          const stat = fs.statSync(path.join(dirPath, name))
          return `${base}?v=${Math.floor(stat.mtimeMs)}`
        } catch {
          return base
        }
      }
      return base
    })
}

/** サイト案内 — public/sites/site1, site2, site3 の全画像を自動読込（差し替え時に cacheBust で反映） */
export function getSiteImages(): { name: string; imageUrls: string[]; imageCount: number }[] {
  const siteNames = ["サイト1", "サイト2", "サイト3"] as const
  return siteNames.map((name, i) => {
    const key = `site${i + 1}`
    const imageUrls = listPublicImages(`sites/${key}`, {
      cacheBust: true,
      extensions: ["avif", "png", "jpg", "jpeg", "webp"],
      sortNumeric: true,
    })
    return { name, imageUrls, imageCount: imageUrls.length }
  })
}
