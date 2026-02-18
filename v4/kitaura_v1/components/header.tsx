"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/layout"

const navItems = [
  { label: "犬種制限について", href: "/pet" },
  { label: "サイト案内", href: "#sites" },
  { label: "料金", href: "#pricing" },
  { label: "利用規約・マナー", href: "#rules" },
  { label: "アクセス", href: "#access" },
  { label: "お知らせ・メディア", href: "#news" },
  { label: "お問い合わせ", href: "/contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center" aria-label="KITAURA LAKESIDE RV park">
          <img
            src="/futter_logo.png"
            alt="KITAURA LAKESIDE RV park"
            width={60}
            height={58}
            className="h-10 w-10 object-cover sm:h-12 sm:w-12"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu（予約・空き確認は表示しない） */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 lg:px-8" aria-label="Mobile navigation">
            {navItems
              .filter((item) => item.href !== "/contact")
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
          </nav>
        </div>
      )}
    </header>
  )
}
