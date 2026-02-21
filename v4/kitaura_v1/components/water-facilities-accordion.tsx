"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const bathItems = [
  "シャンプー",
  "ドライヤー",
  "リンス",
  "バスマット",
  "ボディソープ",
  "歯ブラシ",
]

const kitchenItems = ["ハンドソープ", "スポンジ", "食器洗剤"]

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md bg-muted px-2.5 py-1 text-sm text-muted-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export function WaterFacilitiesAccordion() {
  const [open, setOpen] = useState(true)
  return (
    <div className="mt-3 rounded-lg border border-border bg-muted/30 px-3 py-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
        aria-expanded={open}
      >
        アメニティ一覧
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-3 border-t border-border pb-3 pt-2">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">バス用品</p>
            <ChipList items={bathItems} />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">キッチン・その他</p>
            <ChipList items={kitchenItems} />
          </div>
        </div>
      )}
    </div>
  )
}
