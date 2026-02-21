"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Globe, Mail, Phone } from "lucide-react"

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <div
      className={`booking-modal ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      aria-label="予約方法を選択"
    >
      <div className="booking-modal__overlay" onClick={onClose} aria-hidden />
      <div className="booking-modal__sheet">
        <div className="booking-modal__header">
          <h2 className="booking-modal__title">予約方法を選択</h2>
          <button
            type="button"
            className="booking-modal__close"
            aria-label="閉じる"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <a href="https://lin.ee/D9p4FmI" target="_blank" rel="noopener noreferrer" className="booking-modal__main-cta" id="booking-line-cta">
          LINE
          <span className="booking-modal__main-cta-sub">お問い合わせ・空き状況確認</span>
        </a>
        <p className="booking-modal__other-label">その他の予約方法</p>
        <p className="booking-modal__other-note">
          当日予約や急ぎの連絡はLINEがスムーズです。（電話は折り返しに時間がかかります）
        </p>
        <div className="booking-modal__other-btns" role="group" aria-label="その他の予約方法">
          <a href="https://www.nap-camp.com/ibaraki/16590/plans" target="_blank" rel="noopener noreferrer" className="booking-modal__other-btn booking-modal__other-btn--web">
            <span className="booking-modal__other-icon" aria-hidden>
              <Globe size={20} strokeWidth={2} />
            </span>
            <span>WEB</span>
          </a>
          <Link href="/contact" className="booking-modal__other-btn booking-modal__other-btn--mail" onClick={onClose}>
            <span className="booking-modal__other-icon" aria-hidden>
              <Mail size={20} strokeWidth={2} />
            </span>
            <span>メール</span>
          </Link>
          <a href="tel:070-8414-8109" className="booking-modal__other-btn booking-modal__other-btn--tel">
            <span className="booking-modal__other-icon" aria-hidden>
              <Phone size={20} strokeWidth={2} />
            </span>
            <span>TEL</span>
          </a>
        </div>
      </div>
    </div>
  )
}
