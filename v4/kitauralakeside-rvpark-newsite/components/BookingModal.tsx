"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";

export function FixedCta() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <div className="fixed-cta" id="booking">
        <button type="button" className="js-open-booking" onClick={() => setOpen(true)}>
          予約・空き確認
        </button>
      </div>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

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
        <a
          href="https://lin.ee/D9p4FmI"
          className="booking-modal__main-cta"
          id="booking-line-cta"
        >
          LINE
          <span className="booking-modal__main-cta-sub">お問い合わせ・空き状況確認</span>
        </a>
        <p className="booking-modal__other-label">その他の予約方法</p>
        <div className="booking-modal__other-btns" role="group" aria-label="その他の予約方法">
          <a href="#" className="booking-modal__other-btn booking-modal__other-btn--web">
            <span className="booking-modal__other-icon" aria-hidden>
              <Globe size={20} strokeWidth={2} />
            </span>
            <span>WEB</span>
          </a>
          <Link href="/contact" className="booking-modal__other-btn booking-modal__other-btn--mail">
            <span className="booking-modal__other-icon" aria-hidden>
              <Mail size={20} strokeWidth={2} />
            </span>
            <span>メール</span>
          </Link>
          <a href="tel:07084148109" className="booking-modal__other-btn booking-modal__other-btn--tel">
            <span className="booking-modal__other-icon" aria-hidden>
              <Phone size={20} strokeWidth={2} />
            </span>
            <span>TEL</span>
          </a>
        </div>
      </div>
    </div>
  );
}
