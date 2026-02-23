import { Award, TrendingUp, Ban, Shield, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Reason {
  icon: LucideIcon
  number: string
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    icon: Award,
    number: "01",
    title: "脂肪冷却の専門サロン",
    description:
      "脂肪冷却に特化した専門知識で、安全に理想のボディラインへ。3台同時施術も承れます。",
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "2.5万件以上の実績",
    description:
      "2.5万件以上の実績がある専門スタッフが理想のプランをご提案いたします。",
  },
  {
    icon: Ban,
    number: "03",
    title: "コース勧誘・押し売りは一切無し",
    description: "都度払い制。納得した分だけ通えます。",
  },
  {
    icon: Shield,
    number: "04",
    title: "完全個室で清潔",
    description:
      "自由が丘店、二子玉川店ともに駅から徒歩圏内の好立地。人目に付きにくい入口でプライベート感を。",
  },
  {
    icon: Users,
    number: "05",
    title: "男女利用可",
    description: "男性でも安心してご利用いただけます。",
  },
]

export function Reasons() {
  return (
    <section id="reasons" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Why vieru
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-balance">
            {'vieruが選ばれる理由'}
          </h2>
        </div>

        <div className="space-y-6">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div
                key={reason.number}
                className="flex gap-5 md:gap-8 bg-card rounded-2xl p-6 md:p-8"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-2 font-medium">
                    {reason.number}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
