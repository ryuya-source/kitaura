"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, Send, Plus, Trash2 } from "lucide-react"

const MAX_DOG_ENTRIES = 4

type DogEntry = { breed: string; count: number }

const initialDogEntry = (): DogEntry => ({ breed: "", count: 1 })

export function ContactForm() {
  const [dogCompanion, setDogCompanion] = useState("")
  const [dogs, setDogs] = useState<DogEntry[]>([])
  const [submitted, setSubmitted] = useState(false)

  function onDogCompanionChange(value: string) {
    setDogCompanion(value)
    if (value === "yes") {
      setDogs([initialDogEntry()])
    } else {
      setDogs([])
    }
  }

  function addDog() {
    if (dogs.length >= MAX_DOG_ENTRIES) return
    setDogs((prev) => [...prev, initialDogEntry()])
  }

  function removeDog(index: number) {
    if (index <= 0) return
    setDogs((prev) => prev.filter((_, i) => i !== index))
  }

  function updateDog(index: number, field: keyof DogEntry, value: string | number) {
    setDogs((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry))
    )
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (dogCompanion === "yes") {
      const filled = dogs.filter((d) => d.breed.trim() !== "")
      if (filled.length === 0) return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-card p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Send className="h-7 w-7 text-primary" />
        </div>
        <h2 className="font-sans text-2xl font-bold text-foreground">送信完了</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          メッセージを確認して担当者から順次返信します。
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          TOPに戻る
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          TOPに戻る
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            お名前
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="例：山田 太郎"
            required
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            ご連絡先
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="例：090-1234-5678"
            required
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            メールアドレス
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="例：example@email.com"
            required
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            ご希望のお日にち
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <input
            id="date"
            type="date"
            required
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        {/* Number of Guests */}
        <div>
          <label htmlFor="guests" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            ご利用人数
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <select
            id="guests"
            required
            defaultValue=""
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="" disabled>選択してください</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        {/* Check-in Time */}
        <div>
          <label htmlFor="checkin-time" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            チェックイン時間
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <select
            id="checkin-time"
            required
            defaultValue=""
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="" disabled>選択してください</option>
            <option value="13-14">{'13時〜14時'}</option>
            <option value="14-15">{'14時〜15時'}</option>
            <option value="15-16">{'15時〜16時'}</option>
            <option value="16-17">{'16時〜17時'}</option>
          </select>
        </div>

        {/* Site Number */}
        <div>
          <label htmlFor="site" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            ご希望のサイト番号
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <select
            id="site"
            required
            defaultValue=""
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="" disabled>選択してください</option>
            <option value="site1">サイト1</option>
            <option value="site2">サイト2</option>
            <option value="site3">サイト3</option>
          </select>
        </div>

        {/* Dog Companion */}
        <div>
          <label htmlFor="dog" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            ワンちゃんの犬種・頭数
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <p className="mb-2 text-xs text-muted-foreground">
            同伴されない場合は「なし」を選択してください。
          </p>
          <label htmlFor="dog-select" className="mb-1.5 block text-xs font-medium text-muted-foreground">ワンちゃんの同伴</label>
          <select
            id="dog-select"
            required
            defaultValue=""
            value={dogCompanion}
            onChange={(e) => onDogCompanionChange(e.target.value)}
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="" disabled>選択してください</option>
            <option value="none">なし</option>
            <option value="yes">あり</option>
          </select>

          {dogCompanion === "yes" && (
            <div className="mt-3 space-y-3">
              {dogs.map((entry, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-lg border border-border bg-card/50 p-3 sm:flex-row sm:items-end sm:gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <label htmlFor={`dog-breed-${index}`} className="mb-1 block text-xs font-medium text-muted-foreground">
                      犬種
                    </label>
                    <input
                      id={`dog-breed-${index}`}
                      type="text"
                      placeholder="例：トイプードル"
                      required={index === 0}
                      value={entry.breed}
                      onChange={(e) => updateDog(index, "breed", e.target.value)}
                      className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>
                  <div className="flex items-end gap-2 sm:w-28">
                    <div className="min-w-0 flex-1">
                      <label htmlFor={`dog-count-${index}`} className="mb-1 block text-xs font-medium text-muted-foreground">
                        頭数
                      </label>
                      <select
                        id={`dog-count-${index}`}
                        value={entry.count}
                        onChange={(e) => updateDog(index, "count", Number(e.target.value))}
                        className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n}頭
                          </option>
                        ))}
                      </select>
                    </div>
                    {index > 0 ? (
                      <button
                        type="button"
                        onClick={() => removeDog(index)}
                        aria-label={`${index + 1}件目を削除`}
                        className="shrink-0 rounded-lg border border-input p-2.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-ring/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <span className="w-10 shrink-0" aria-hidden />
                    )}
                  </div>
                </div>
              ))}
              {dogs.length < MAX_DOG_ENTRIES && (
                <button
                  type="button"
                  onClick={addDog}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-input py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <Plus className="h-4 w-4" />
                  もう1頭追加
                </button>
              )}
            </div>
          )}

          <div className="mt-3 flex items-start gap-2 rounded-lg bg-accent/10 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-xs leading-relaxed text-accent-foreground">
              {'アレルギー対策の為、犬種制限あり。ご入場可能な犬種につきましては'}
              <Link href="/#pet" className="font-semibold text-primary hover:underline">
                犬種制限について
              </Link>
              {'よりご確認をお願いいたします。'}
            </p>
          </div>
        </div>

        {/* First Time */}
        <div>
          <label htmlFor="first-time" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            {'当rvパークのご利用は初めてですか？'}
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <select
            id="first-time"
            required
            defaultValue=""
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="" disabled>選択してください</option>
            <option value="yes">はい（初めて）</option>
            <option value="no">いいえ（利用したことがある）</option>
          </select>
        </div>

        {/* Stay Style */}
        <div>
          <label htmlFor="stay-style" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            ご希望のご宿泊スタイル
            <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">必須</span>
          </label>
          <select
            id="stay-style"
            required
            defaultValue=""
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="" disabled>選択してください</option>
            <option value="car">車中泊</option>
            <option value="tent">テント泊</option>
            <option value="both">両方</option>
          </select>
        </div>

        {/* Info text */}
        <p className="text-sm text-muted-foreground">
          メッセージを確認して担当者から順次返信します。
        </p>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          送信する
        </button>

        {/* Privacy note */}
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          ご入力いただいた個人情報は、お問い合わせへの対応およびご連絡の目的でのみ利用し、適切に管理いたします。第三者に開示・提供することはありません。
        </p>
      </form>
    </div>
  )
}
