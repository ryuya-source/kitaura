"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { BookingModal } from "@/components/BookingModal"

type BookingModalContextValue = {
  openBookingModal: () => void
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null)

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openBookingModal = useCallback(() => setOpen(true), [])
  return (
    <BookingModalContext.Provider value={{ openBookingModal }}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </BookingModalContext.Provider>
  )
}

export function useBookingModal(): BookingModalContextValue {
  const ctx = useContext(BookingModalContext)
  if (!ctx) throw new Error("useBookingModal must be used within BookingModalProvider")
  return ctx
}
