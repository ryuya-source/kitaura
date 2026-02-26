import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

/** お問い合わせの送信先（固定） */
const CONTACT_TO_EMAIL = "info@kitauralakeside.com"

type DogEntry = { breed: string; count: number }

export type ContactBody = {
  name: string
  phone: string
  email: string
  date: string
  guests: string
  checkinTime: string
  site: string
  dogCompanion: string
  dogs: DogEntry[]
  firstTime: string
  stayStyle: string
}

const CHECKIN_LABELS: Record<string, string> = {
  "13-14": "13時〜14時",
  "14-15": "14時〜15時",
  "15-16": "15時〜16時",
  "16-17": "16時〜17時",
}
const SITE_LABELS: Record<string, string> = {
  site1: "サイト1",
  site2: "サイト2",
  site3: "サイト3",
}

function buildEmailText(body: ContactBody): string {
  const checkinLabel = CHECKIN_LABELS[body.checkinTime] ?? body.checkinTime
  const siteLabel = SITE_LABELS[body.site] ?? body.site
  const lines: string[] = [
    "【お問い合わせ内容】",
    "",
    `お名前: ${body.name}`,
    `ご連絡先: ${body.phone}`,
    `メールアドレス: ${body.email}`,
    `ご希望のお日にち: ${body.date}`,
    `ご利用人数: ${body.guests}名`,
    `チェックイン時間: ${checkinLabel}`,
    `ご希望のサイト: ${siteLabel}`,
    `ワンちゃんの同伴: ${body.dogCompanion === "yes" ? "あり" : "なし"}`,
  ]

  if (body.dogCompanion === "yes" && body.dogs?.length) {
    lines.push("")
    lines.push("--- 犬種・頭数 ---")
    body.dogs.forEach((d, i) => {
      if (d.breed?.trim()) lines.push(`${i + 1}. ${d.breed} … ${d.count}頭`)
    })
  }

  lines.push("")
  lines.push(`当RVパークのご利用は初めてですか？: ${body.firstTime === "yes" ? "はい" : "いいえ"}`)
  lines.push(`ご希望の宿泊スタイル: ${body.stayStyle === "car" ? "車中泊" : body.stayStyle === "tent" ? "テント泊" : "両方"}`)
  lines.push("")
  lines.push("---")
  lines.push(`送信日時: ${new Date().toLocaleString("ja-JP")}`)

  return lines.join("\n")
}

export async function POST(request: Request) {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host?.trim() || !user?.trim() || !pass) {
    return NextResponse.json(
      { error: "メール送信の設定が完了していません。（SMTP_HOST / SMTP_USER / SMTP_PASS）" },
      { status: 500 }
    )
  }

  const port = Number(process.env.SMTP_PORT) || 465
  const secure = process.env.SMTP_SECURE !== "false"

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })

  let body: ContactBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "リクエストの形式が正しくありません。" },
      { status: 400 }
    )
  }

  const { name, email, dogCompanion, dogs } = body
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "お名前とメールアドレスは必須です。" },
      { status: 400 }
    )
  }
  if (dogCompanion === "yes") {
    const filled = Array.isArray(dogs) ? dogs.filter((d) => d?.breed?.trim()) : []
    if (filled.length === 0) {
      return NextResponse.json(
        { error: "ワンちゃんの同伴ありの場合は、犬種を1件以上入力してください。" },
        { status: 400 }
      )
    }
  }

  const text = buildEmailText(body)
  const from = process.env.CONTACT_FROM_EMAIL ?? user

  try {
    await transport.sendMail({
      from,
      to: CONTACT_TO_EMAIL,
      subject: `[北浦レイクサイドRVパーク] お問い合わせ: ${body.name}`,
      text,
    })
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    const message = err instanceof Error ? err.message : "送信に失敗しました。"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
