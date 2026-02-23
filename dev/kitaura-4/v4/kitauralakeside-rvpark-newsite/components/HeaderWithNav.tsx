"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#pet", label: "犬種制限について" },
  { href: "#feature", label: "サイト案内" },
  { href: "#price", label: "料金" },
  { href: "#terms", label: "利用規約・マナー" },
  { href: "#access", label: "アクセス" },
  { href: "#news", label: "お知らせ・メディア" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function HeaderWithNav() {
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      closeMenu();
      const id = href.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo-frame" aria-label="ロゴ">
          <img
            className="logo-img"
            src="/src/futter_logo.png"
            alt="KITAURA LAKESIDE RV park"
            width={32}
            height={31}
          />
          <div className="logo-text">
            {"KITAURA LAKESIDE\nRV park"}
          </div>
        </div>
        <nav className="nav" aria-label="メインナビゲーション">
          <button
            type="button"
            className={`hamburger-icon ${open ? "is-open" : ""}`}
            aria-label="メニュー"
            onClick={toggleMenu}
            aria-expanded={open}
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
              <line className="hamburger-icon__line hamburger-icon__line--top" x1={5} y1={7} x2={19} y2={7} strokeWidth={2} strokeLinecap="round" stroke="#1a1a1a" />
              <line className="hamburger-icon__line hamburger-icon__line--mid" x1={5} y1={12} x2={19} y2={12} strokeWidth={2} strokeLinecap="round" stroke="#1a1a1a" />
              <line className="hamburger-icon__line hamburger-icon__line--btm" x1={5} y1={17} x2={19} y2={17} strokeWidth={2} strokeLinecap="round" stroke="#1a1a1a" />
            </svg>
          </button>
        </nav>
      </header>
      <div
        className={`nav-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
      >
        <div className="nav-overlay__panel">
          <ul className="nav-overlay__list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="nav-overlay__link"
                  onClick={(e) => handleLinkClick(e, href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
