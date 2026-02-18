"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** ルートページで URL のハッシュに対応するセクションへスクロールする */
export function ScrollToHash() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return
    const hash = typeof window !== "undefined" ? window.location.hash : ""
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (el) {
      const t = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
      return () => clearTimeout(t)
    }
  }, [pathname])

  return null
}
