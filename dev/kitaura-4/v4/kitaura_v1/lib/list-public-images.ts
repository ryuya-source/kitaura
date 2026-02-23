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

export function getSiteImages(): { name: string; imageUrls: string[]; imageCount: number }[] {
  const siteNames = ["サイト1", "サイト2", "サイト3"] as const
  return siteNames.map((name, i) => {
    const key = `site${i + 1}`
    const imageUrls = listPublicImages(`sites/${key}`, {
      extensions: ["avif", "png", "jpg", "webp"],
      sortNumeric: true,
    })
    return { name, imageUrls, imageCount: imageUrls.length }
  })
}
