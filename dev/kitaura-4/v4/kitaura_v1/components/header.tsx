"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useBookingModal } from "@/components/booking-modal-context"
import { Container } from "@/components/layout"

/** このスクロール量（px）でロゴを上部に流す */
const HEADER_LOGO_RANGE_PX = 120

const navItems: { label: string; href: string; openBooking?: boolean }[] = [
  { label: "犬種制限について", href: "#pet" },
  { label: "サイト案内", href: "#sites" },
  { label: "料金", href: "#pricing" },
  { label: "利用規約・マナー", href: "#rules" },
  { label: "アクセス", href: "#access" },
  { label: "お知らせ・メディア", href: "#news" },
  { label: "ご予約", href: "/contact", openBooking: true },
  { label: "お問い合わせ", href: "/contact" },
]

interface HeaderProps {
  /** true のときロゴを隠し、ハンバーガーメニューのみ表示（お問い合わせページ用） */
  onlyHamburger?: boolean
}

export function Header({ onlyHamburger }: HeaderProps) {
  const pathname = usePathname()
  const { openBookingModal } = useBookingModal()
  const [open, setOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    function update() {
      setScrollY(window.scrollY)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const closeMenu = useCallback(() => setOpen(false), [])

  const isHome = pathname === "/"
  const logoScrollProgress = isHome ? Math.min(1, scrollY / HEADER_LOGO_RANGE_PX) : 0
  const logoTranslateY = -logoScrollProgress * 48
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
      {!onlyHamburger && (
        <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
          <Container className="flex items-center py-3">
            <Link
              href="/"
              className="flex flex-col items-center gap-1.5 text-center transition-transform duration-200 ease-out"
              aria-label="KITAURA LAKESIDE RV park"
              style={{ transform: `translateY(${logoTranslateY}px)` }}
            >
              <Image
                src="/futter_logo.avif"
                alt="KITAURA LAKESIDE RV park"
                width={80}
                height={78}
                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
              />
              <div className="flex flex-col gap-0.5 text-white drop-shadow-sm">
                <span className="text-xs font-semibold tracking-widest sm:text-sm">
                  KITAURA LAKESIDE
                </span>
                <span className="text-xs font-semibold tracking-widest sm:text-sm">
                  RV park
                </span>
              </div>
            </Link>
          </Container>
        </header>
      )}

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
            {navItems.map(({ href, label, openBooking }) => (
              <li key={`${href}-${label}`}>
                {openBooking ? (
                  <button
                    type="button"
                    className="nav-overlay__link w-full text-left"
                    onClick={() => {
                      closeMenu()
                      openBookingModal()
                    }}
                  >
                    {label}
                  </button>
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
