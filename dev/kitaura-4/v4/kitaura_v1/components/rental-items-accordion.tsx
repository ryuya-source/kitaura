"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const rentalItems = [
  { name: "エアコン（屋外での使用不可）車内/テント内専用", price: "１日/2,000円" },
  { name: "ストーブ（灯油込）", price: "１日1,000円〜1,500円" },
]

export function RentalItemsAccordion() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-3 rounded-lg border border-border bg-muted/30 px-3 py-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
        aria-expanded={open}
      >
        レンタル品一覧
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-2 border-t border-border pb-3 pt-2">
          {rentalItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-wrap items-baseline justify-between gap-2 text-sm text-muted-foreground"
            >
              <span>{item.name}</span>
              <span className="font-medium text-foreground">{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
