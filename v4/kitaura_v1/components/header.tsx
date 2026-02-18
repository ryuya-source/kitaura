"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/layout"

const navItems = [
  { label: "犬種制限について", href: "#pet" },
  { label: "サイト案内", href: "#sites" },
  { label: "料金", href: "#pricing" },
  { label: "利用規約・マナー", href: "#rules" },
  { label: "アクセス", href: "#access" },
  { label: "お知らせ・メディア", href: "#news" },
  { label: "お問い合わせ", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const closeMenu = useCallback(() => setOpen(false), [])
  const toggleMenu = useCallback(() => setOpen((o) => !o), [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      e.preventDefault()
      closeMenu()
      window.history.pushState(null, "", `/${href}`)
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      closeMenu()
    }
  }

  const getSectionLinkHref = (href: string) =>
    href.startsWith("#") ? `/${href}` : href

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
        <Container className="flex items-center py-3">
          <Link
            href="/"
            className="flex flex-col items-center gap-1.5 text-center"
            aria-label="KITAURA LAKESIDE RV park"
          >
            <img
              src="/futter_logo.png"
              alt=""
              width={80}
              height={78}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
            <div className="flex flex-col gap-0.5 text-white drop-shadow-sm">
              <span className="text-xs font-semibold tracking-widest sm:text-sm">
                KITAURA LAKESIDE
              </span>
              <span className="text-[10px] tracking-[0.3em] sm:text-xs">
                RV park
              </span>
            </div>
          </Link>
        </Container>
      </header>

      <div className="fixed top-0 right-0 z-50 flex items-center p-3 pt-[max(12px,env(safe-area-inset-top))] pr-[max(12px,env(safe-area-inset-right))] lg:hidden">
        <button
          type="button"
          className={`hamburger-icon ${open ? "is-open" : ""}`}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={toggleMenu}
          aria-expanded={open}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <line
              className="hamburger-icon__line hamburger-icon__line--top"
              x1={5}
              y1={7}
              x2={19}
              y2={7}
              strokeWidth={2}
              strokeLinecap="round"
              stroke="currentColor"
            />
            <line
              className="hamburger-icon__line hamburger-icon__line--mid"
              x1={5}
              y1={12}
              x2={19}
              y2={12}
              strokeWidth={2}
              strokeLinecap="round"
              stroke="currentColor"
            />
            <line
              className="hamburger-icon__line hamburger-icon__line--btm"
              x1={5}
              y1={17}
              x2={19}
              y2={17}
              strokeWidth={2}
              strokeLinecap="round"
              stroke="currentColor"
            />
          </svg>
        </button>
      </div>

      {/* フルスクリーンオーバーレイ（kitauralakeside-rvpark-newsite 同様） */}
      <div
        className={`nav-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
      >
        <div className="nav-overlay__panel">
          <ul className="nav-overlay__list">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={getSectionLinkHref(href)}
                  className="nav-overlay__link"
                  onClick={(e) => {
                    if (pathname === "/" && href.startsWith("#")) {
                      handleSectionClick(e, href)
                    } else {
                      closeMenu()
                    }
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
