"use client";

import { useState, useEffect } from "react";
import BookingModal from "./BookingModal";

export default function PetBookingFooter() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="pet-rules-footer">
        <button
          type="button"
          className="pet-rules-footer__btn"
          onClick={() => setOpen(true)}
        >
          予約・空き確認
        </button>
      </div>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
