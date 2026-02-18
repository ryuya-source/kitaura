import { redirect } from "next/navigation"

export const metadata = {
  title: "犬種制限について | KITAURA LAKESIDE RV park",
  description: "入場可能なワンちゃんについて。アレルギー反応が出にくい環境を維持するため、抜け毛の少ないシングルコートの犬種に限定しています。",
}

/** 犬種制限の内容はルートページの #pet に移植済みのため、ルートへリダイレクト */
export default function PetPage() {
  redirect("/#pet")
}
